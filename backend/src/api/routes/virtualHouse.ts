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
    const { description, wall_no, x, y, z, length, height, depth } = req.body;

    const vhId = uuidv4();
    const virtualHouse = await VirtualHouse.create({
      id: vhId,
      description: description,
    });

    const vrId = uuidv4();
    const vr = await virtualHouse.createVirtualRoom({
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
      let vw = await vr.createVirtualWall({
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

virtualHouseRouter.post(
  '/image',
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    if (!req.file) {
      return next(new HttpError(404, 'file not attached'));
    }

    if (!req.body.data) {
      return next(new HttpError(404, 'no file date attached'));
    }

    const formData = JSON.parse(req.body.data);
    const { virtual_wall_id } = formData;
    const user = (req as CustomRequest).user;

    // image manipulation of image submitted (resizing) to 1920 x 1080
    const buffer = await sharp(req.file!.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .toBuffer();

    // create a new unique id to store image in s3
    const image_id = uuidv4();

    s3Service.storeImageInBucket(image_id, buffer, req.file.mimetype);

    // save image details to db
    await ImageModel.create({
      id: image_id,
      image_able: 'virtual-room-image',
      virtual_wall_id: virtual_wall_id,
    });

    // generate image url
    const image_url = await s3Service.generateImageUrlFromBucket(
      image_id,
      3600
    );

    res.send({ image_id, image_url });
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

export default virtualHouseRouter;
