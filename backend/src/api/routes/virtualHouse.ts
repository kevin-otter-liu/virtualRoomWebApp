import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import VirtualRoom from '../../db/models/VirtualRoom';
import VirtualHouse from '../../db/models/VirtualHouse';

import ImageModel from '../../db/models/Image';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import s3Service from '../services/s3Client';
import { CustomRequest } from '../middleware/check-auth';
import { HttpError } from '../../libs/http-error';
import { checkAuth } from '../middleware/check-auth';
import VirtualWall from '../../db/models/VirtualWall';

// for generating url

const virtualHouseRouter = Router();
virtualHouseRouter.use(checkAuth);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
upload.single('avatar');
// create a empty virtual house
virtualHouseRouter.post(
  '/create',
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;
    const { description, wall_no, x, y, z, length, height, depth, name } =
      req.body;

    const vhId = uuidv4();
    const virtualHouse = await VirtualHouse.create({
      name: name,
      id: vhId,
      description: description,
      user_id: user.id,
    });

    let vrId = uuidv4();
    const vr = await VirtualRoom.create({
      virtual_house_id: virtualHouse.id,
      id: vrId,
      completed_walls: 0,
      description: description,
      wall_no: wall_no,
      x,
      y,
      z,
      length,
      depth,
      height,
    });

    const virtualWalls: Array<any> = [];
    for (let i = 0; i < wall_no; i++) {
      let vwId = uuidv4();
      let vw = await VirtualWall.create({
        virtual_room_id: vr.id,
        id: vwId,
        face: i,
        is_door: false,
      });

      virtualWalls.push(vw.dataValues);
    }

    res.status(200).json({
      virtual_house: {
        ...virtualHouse.dataValues,
        virtual_rooms: [
          {
            ...vr.dataValues,
            virtual_walls: virtualWalls,
          },
        ],
      },
    });
    next();
  }
);

// create a empty virtual room
virtualHouseRouter.post(
  '/add-door',
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;

    const {
      virtual_room_id,
      virtual_wall_id,
      wall_no,
      x,
      y,
      z,
      length,
      height,
      depth,
    } = req.body;

    console.log(req.body);

    let vr = await VirtualRoom.findByPk(virtual_room_id);

    if (!vr) {
      return next(new HttpError(404, 'no virtual room found'));
    }

    const vrId = uuidv4();
    let nextVrRoom = await VirtualRoom.create({
      id: vrId,
      depth,
      height,
      length,
      x,
      y,
      z,
      wall_no: 6,
      virtual_house_id: vr.virtual_house_id,
      completed_walls: 0,
    });

    const virtualWalls: Array<any> = [];
    for (let i = 0; i < wall_no; i++) {
      console.log(nextVrRoom.id);
      let vwId = uuidv4();
      let vw = await VirtualWall.create({
        virtual_room_id: nextVrRoom.id,
        id: vwId,
        face: i,
        is_door: false,
      });

      virtualWalls.push(vw.dataValues);
    }

    await VirtualWall.update(
      { is_door: true, next_room: nextVrRoom.id },
      { where: { id: virtual_wall_id } }
    );

    let updatedVh = await VirtualHouse.findByPk(vr.virtual_house_id, {
      order: [
        [
          { model: VirtualRoom, as: 'virtual_rooms' },
          { model: VirtualWall, as: 'virtual_walls' },
          'face',
          'ASC',
        ],
      ],
      include: [
        {
          model: VirtualRoom,
          as: 'virtual_rooms',
          include: [
            {
              model: VirtualWall,
              as: 'virtual_walls',
              include: [
                { model: ImageModel, as: 'image', attributes: ['url', 'id'] },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json(updatedVh!.dataValues);
    next();
  }
);

virtualHouseRouter.post(
  '/image',
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next(new HttpError(404, 'file not attached'));
    }

    if (!req.body.data) {
      return next(new HttpError(404, 'no file date attached'));
    }

    const user = (req as CustomRequest).user;

    const formData = JSON.parse(req.body.data);
    const { face, virtual_wall_id, is_door } = formData;

    // image manipulation of image submitted (resizing) to 1920 x 1080
    const buffer = await sharp(req.file!.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .toBuffer();

    // create a new unique id to store image in s3
    const image_id = uuidv4();

    await s3Service.storeImageInBucket(image_id, buffer, req.file.mimetype);
    const image_url = await s3Service.generateImageUrlFromBucket(
      image_id,
      60 * 60 * 24
    );
    let vw = await VirtualWall.findByPk(virtual_wall_id);
    if (vw) {
      await ImageModel.create({
        id: image_id,
        image_able: 'virtual-room-image',
        user_id: user.id,
        url: image_url,
      });
      let res = await vw.update({ image_id: image_id, is_door: is_door });
    }

    // generate image url
    res.status(200).send({ image_id, image_url, face, is_door });
    next();
  }
);

// getting an image url from s3
virtualHouseRouter.get(
  '/image',
  async (req: Request, res: Response, next: NextFunction) => {
    // find image id in database
    const image = await ImageModel.findOne();

    // get image from s3 using id
    const url = await s3Service.generateImageUrlFromBucket(image!.id, 3600);

    // send the information of the image with the url
    res.send({
      ...image?.dataValues,
      url,
    });
  }
);

virtualHouseRouter.get('/', async (req, res, next) => {
  let user = (req as CustomRequest).user;
  let virtualHouses = await VirtualHouse.findAll({
    where: {
      user_id: user.id,
    },
    order: [
      [
        { model: VirtualRoom, as: 'virtual_rooms' },
        { model: VirtualWall, as: 'virtual_walls' },
        'face',
        'ASC',
      ],
    ],
    include: [
      {
        model: VirtualRoom,
        as: 'virtual_rooms',
        include: [
          {
            model: VirtualWall,
            as: 'virtual_walls',
            include: [
              { model: ImageModel, as: 'image', attributes: ['url', 'id'] },
            ],
          },
        ],
      },
    ],
  });

  res.status(200).send(virtualHouses);
});

virtualHouseRouter.delete('/:virtual_house_id', async (req, res, next) => {
  let { virtual_house_id } = req.params;

  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  let isUUID = regexExp.test(virtual_house_id);

  if (!isUUID) {
    return next(new HttpError(404, 'param not uuid'));
  }

  let vh = await VirtualHouse.findByPk(virtual_house_id);

  let vhid = vh?.id;

  if (!vh) {
    return next(new HttpError(404, 'virtual house not found'));
  }

  await vh.destroy();

  res.status(200).send();
});

export default virtualHouseRouter;
