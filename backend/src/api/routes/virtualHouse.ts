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

const EXP_TIME = 60 * 60;

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
      posted: false,
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

// creates the next virtual room from current virtual wall
virtualHouseRouter.post(
  '/add-door',
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;

    const { virtual_room_id, virtual_wall_id, wall_no, length, height, depth } =
      req.body;

    let currentVr = await VirtualRoom.findByPk(virtual_room_id);
    let currentWall = await VirtualWall.findByPk(virtual_wall_id);

    if (!currentVr || !currentWall) {
      return next(new HttpError(404, 'no virtual room or wall found'));
    }

    // calculate new room position
    let new_position = calculateNewRoomPosition(
      currentVr.length,
      currentVr.depth,
      currentVr.height,
      currentWall.face,
      currentVr.x,
      currentVr.y,
      currentVr.z,
      length,
      depth,
      height
    );

    const vrId = uuidv4();
    let nextVrRoom = await VirtualRoom.create({
      id: vrId,
      depth,
      height,
      length,
      x: new_position[0],
      y: new_position[1],
      z: new_position[2],
      wall_no: 6,
      virtual_house_id: currentVr.virtual_house_id,
      completed_walls: 0,
    });

    let nextRoomWallWithDoor = getNextRoomWallFace(currentWall.face);
    console.log(`nextroom wall with door ${nextRoomWallWithDoor}`);

    for (let i = 0; i < wall_no; i++) {
      console.log(nextVrRoom.id);
      let vwId = uuidv4();
      let vw = await VirtualWall.create({
        virtual_room_id: nextVrRoom.id,
        id: vwId,
        face: i,
        is_door: nextRoomWallWithDoor == i ? true : false,
        next_room:
          nextRoomWallWithDoor == i ? currentWall.virtual_room_id : undefined,
      });
    }

    await VirtualWall.update(
      { is_door: true, next_room: nextVrRoom.id },
      { where: { id: virtual_wall_id } }
    );

    let updatedVh = await VirtualHouse.findByPk(currentVr.virtual_house_id, {
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

// upload an image
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
    const { virtual_wall_id, virtual_room_id } = formData;

    // find tue existing virtual wall image is attached to
    let vw = await VirtualWall.findByPk(virtual_wall_id);

    if (!vw) {
      return next(new HttpError(404, 'virtual wall does not exist'));
    }

    // if an old image already exists on current virtual wall, delete it
    if (vw.dataValues.image_id) {
      let data = await s3Service.deleteImageFromBucket(vw.dataValues.image_id);
      await ImageModel.destroy({ where: { id: vw.dataValues.image_id } });
    }

    // image manipulation of image submitted (resizing) to 1920 x 1080
    const buffer = await sharp(req.file!.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .toBuffer();

    // create a new unique id to store image in s3
    const image_id = uuidv4();

    // store the new image into the bucket and set its access expiry for 5 mins
    await s3Service.storeImageInBucket(image_id, buffer, req.file.mimetype);
    const image_url = await s3Service.generateImageUrlFromBucket(
      image_id,
      EXP_TIME
    );

    // store new image metadata into db
    let currentTime = new Date();
    await ImageModel.create({
      id: image_id,
      image_able: 'virtual-room-image',
      user_id: user.id,
      url: image_url,
      expire_at: new Date(currentTime.getTime() + EXP_TIME * 1000),
    });

    // update the new virtual wall image
    let updatedVw = await vw.update({ image_id: image_id });

    let vr = await VirtualRoom.findByPk(virtual_room_id);

    if (!vr) {
      return next(new HttpError(404, 'no virtual room found'));
    }

    let vh = await VirtualHouse.findByPk(vr.virtual_house_id, {
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

    // generate image url
    res.status(200).send(vh?.dataValues);
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
    const url = await s3Service.generateImageUrlFromBucket(image!.id, EXP_TIME);

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

virtualHouseRouter.put('/upload/:virtual_house_id', async (req, res, next) => {
  let { virtual_house_id } = req.params;

  console.log(virtual_house_id);

  let vh = await VirtualHouse.findByPk(virtual_house_id);

  if (!vh) {
    return new HttpError(404, 'invalid_id');
  }

  await vh.update({ posted: true });

  res.status(200).send();
});

// helper functions
const calculateNewRoomPosition = (
  currLength: number,
  currDepth: number,
  currHeight: number,
  currFace: number,
  x: number,
  y: number,
  z: number,
  newLength: number,
  newDepth: number,
  newHeight: number
): Array<number> => {
  let new_x: number, new_y: number, new_z: number;

  if (currFace === 0) {
    new_x = x + currLength / 2 + newLength / 2;
    new_y = y;
    new_z = z;
  } else if (currFace === 1) {
    new_x = x - currLength / 2 - newLength / 2;
    new_y = y;
    new_z = z;
  } else if (currFace === 2) {
    new_x = x;
    new_y = y + currHeight / 2 + newHeight / 2;
    new_z = z;
  } else if (currFace === 3) {
    new_x = x;
    new_y = y - currHeight / 2 - newHeight / 2;
    new_z = z;
  } else if (currFace === 4) {
    new_x = x;
    new_y = y;
    new_z = z + currDepth / 2 + newDepth / 2;
  } else {
    new_x = x;
    new_y = y;
    new_z = z - currDepth / 2 - newDepth / 2;
  }

  let new_position: Array<number> = new Array<number>(new_x, new_y, new_z);
  return new_position;
};

// gets face index of wall of next_room
const getNextRoomWallFace = (curr_face: number) => {
  let wallFaceMap = new Map<number, number>();
  wallFaceMap.set(0, 1);
  wallFaceMap.set(1, 0);
  wallFaceMap.set(4, 5);
  wallFaceMap.set(5, 4);
  wallFaceMap.set(2, 3);
  wallFaceMap.set(3, 2);
  return wallFaceMap.get(curr_face)!;
};
export default virtualHouseRouter;
