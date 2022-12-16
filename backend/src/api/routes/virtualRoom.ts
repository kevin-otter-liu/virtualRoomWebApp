import { Router, Request, Response, NextFunction } from 'express';
import VirtualRoom from '../../db/models/VirtualRoom';
import ImageModel from '../../db/models/Image';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const accessKeyId = process.env.S3_ACCESS_KEY!;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY!;
const region = process.env.BUCKET_REGION!;
const bucketName = process.env.BUCKET_NAME!;

const s3client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

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

    const params = {
      Bucket: bucketName,
      Key: image_id,
      Body: buffer,
      ContentType: req.file?.mimetype,
    };

    // get function to upload to s3
    const command = new PutObjectCommand(params);
    await s3client.send(command);

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
    const image = await ImageModel.findOne();

    const getObjectParams = {
      Bucket: bucketName,
      Key: image?.id,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3client, command, { expiresIn: 3600 });

    res.send({
      ...image?.dataValues,
      url,
    });
  }
);

export default virtualRoomRouter;
