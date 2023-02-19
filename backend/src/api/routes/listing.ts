import { Router } from 'express';
import { HttpError } from '../../libs/http-error';
import { CustomRequest } from '../middleware/check-auth';
import s3Service from '../services/s3Client';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import Listing from '../../db/models/Listing';
const listingRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const EXP_TIME = 60 * 60;

const s3 = listingRouter.post(
  '/create',
  upload.fields([
    { name: 'building', maxCount: 1 },
    { name: 'texture', maxCount: 10 },
  ]),
  async (req, res, next) => {
    if (!req.files || req.files instanceof Array) {
      return next(new HttpError(404, 'file not attached'));
    }
    // check for that files uploaded has an extension (e.g .fbx , .jpg)
    req.files['building'].forEach((file) => {
      if (file.originalname.split('.').length < 2) {
        return next(new HttpError(404, 'invalid file format'));
      }
    });

    req.files['texture'].forEach((file) => {
      if (file.originalname.split('.').length < 2) {
        return next(new HttpError(404, 'invalid file format'));
      }
    });

    let fileNameSplit = req.files['building'][0].originalname.split('.');

    if (!req.body.data) {
      return next(new HttpError(404, 'no file date attached'));
    }

    const user = (req as CustomRequest).user;
    const formData = JSON.parse(req.body.data);

    // validating form fields

    let formFields = [
      'description',
      'location',
      'project_name',
      'developer_name',
    ];
    // check formdata is populated
    for (let field of formFields) {
      if (!formData[field]) {
        return next(new HttpError(404, `${field} is missing`));
      }
    }

    // storing .fbx file on s3 bucket
    const {
      description,
      location,
      project_name: name,
      developer_name: developer,
    } = formData;

    let file_extension = '.' + fileNameSplit[fileNameSplit.length - 1];
    const listing_id = uuidv4();

    await s3Service.storeFileInBucket(
      listing_id + file_extension,
      req.files['building'][0].buffer,
      req.files['building'][0].mimetype,
      'building1'
    );
    // console.log(req.files['texture'][0]);
    // console.log(req.files['texture'][1]);

    // await s3Service.storeFileInBucket(
    //   req.files['texture'][0].originalname,
    //   req.files['texture'][0].buffer,
    //   req.files['texture'][0].mimetype,
    //   'building1'
    // );
    // await s3Service.storeFileInBucket(
    //   req.files['texture'][1].originalname,
    //   req.files['texture'][1].buffer,
    //   req.files['texture'][1].mimetype,
    //   'building1'
    // );

    let currentTime = new Date();
    await Listing.create({
      id: listing_id,
      user_id: user.id,
      description,
      location,
      name,
      developer,
      file_extension,
      expire_at: new Date(currentTime.getTime() + EXP_TIME * 1000),
    });

    // generate URL

    const url = await s3Service.generateFileUrlFromBucket(
      listing_id + file_extension,
      EXP_TIME,
      'building1'
    );

    res.status(200).json({ url });
  }
);

export default listingRouter;
