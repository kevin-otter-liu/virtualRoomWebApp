import { Router, Request, Response, NextFunction } from 'express';
import VirtualRoom from '../../db/models/VirtualRoom';
import ImageModel from '../../db/models/Image';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import s3Service from '../services/s3Client';

// for generating url

const virtualRoomRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

upload.single('avatar');
virtualRoomRouter.post(
  '/image',
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    // image manipulation of image submitted (resizing) to 1920 x 1080
    const buffer = await sharp(req.file!.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .toBuffer();

    // create a new unique id to store image in s3
    const image_id = uuidv4();

    s3Service.storeImageInBucket(image_id, buffer, req.file!.mimetype);

    // save image details to db
    await ImageModel.create({
      id: image_id,
      image_able: 'virtual-room-image',
      description: req.body.description,
    });

    res.send({ message: 'ok' });
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
