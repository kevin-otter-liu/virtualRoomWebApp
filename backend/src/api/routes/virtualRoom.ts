import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import VirtualRoom from '../../db/models/VirtualRoom';
import ImageModel from '../../db/models/Image';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import s3Service from '../services/s3Client';
import { CustomRequest } from '../middleware/check-auth';
import { HttpError } from '../../libs/http-error';
import { checkAuth } from '../middleware/check-auth';

// for generating url

const virtualRoomRouter = Router();
virtualRoomRouter.use(checkAuth);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
upload.single('avatar');
virtualRoomRouter.post(
  '/create',
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;
    const { description, wall_no } = req.body;
    const vr = await VirtualRoom.create({
      id: uuidv4(),
      completedWalls: 0,
      description: description,
      userId: user.id,
      wallNo: wall_no,
    });
    res.status(200).json(vr.dataValues);
    next();
  }
);

virtualRoomRouter.post(
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
virtualRoomRouter.get(
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

export default virtualRoomRouter;
