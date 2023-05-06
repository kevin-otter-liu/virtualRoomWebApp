import { Router } from 'express';
import { HttpError } from '../../libs/http-error';
import { CustomRequest } from '../middleware/check-auth';
import s3Service from '../services/s3Client';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import Listing from '../../db/models/Listing';
import { Op } from 'sequelize';
import Image from '../../db/models/Image';
import CompanyModel from '../../db/models/Company';
const listingRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const EXP_TIME = 60 * 60;

listingRouter.post(
  '/create',
  upload.fields([
    { name: 'building', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
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

    // check thumbnail are allowed types
    const allowedImgTypes = ['png', 'jpeg', 'jpg', 'gif'];
    req.files['thumbnail'].forEach((file) => {
      if (
        file.originalname.split('.').length < 2 ||
        !allowedImgTypes.includes(file.originalname.split('.')[1])
      ) {
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
      'contact_email',
      'completion_date',
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
      contact_email,
      completion_date,
    } = formData;

    let file_extension = '.' + fileNameSplit[fileNameSplit.length - 1];
    const listing_id = uuidv4();
    const thumbnail_id = uuidv4();

    await s3Service.storeFileInBucket(
      listing_id + file_extension,
      req.files['building'][0].buffer,
      req.files['building'][0].mimetype
    );
    await s3Service.storeFileInBucket(
      thumbnail_id,
      req.files['thumbnail'][0].buffer,
      req.files['thumbnail'][0].mimetype
    );

    let currentTime = new Date();
    let company = await CompanyModel.findOne({ where: { user_id: user.id } });

    if (!company) {
      return new HttpError(404, 'no_company_found');
    }

    let listing = await Listing.create({
      id: listing_id,
      user_id: user.id,
      description,
      location,
      name,
      contact_email,
      file_extension,
      developer_name: company.dataValues.company_name,
      completion_date: new Date(completion_date),
      expire_at: new Date(currentTime.getTime() + EXP_TIME * 1000),
    });

    await Image.create({
      id: thumbnail_id,
      image_able: 'listing-thumbnail',
      expire_at: new Date(currentTime.getTime() + EXP_TIME * 1000),
      user_id: user.id,
      listing_id: listing_id,
    });

    // generate URL

    const fbxUrl = await s3Service.generateFileUrlFromBucket(
      listing_id + file_extension,
      EXP_TIME
    );
    const thumbnailUrl = await s3Service.generateFileUrlFromBucket(
      thumbnail_id,
      EXP_TIME
    );

    res.status(200).json([fbxUrl, thumbnailUrl]);
    return next();
  }
);

// get all user's listings
listingRouter.get('/', async (req, res, next) => {
  const user = (req as CustomRequest).user;
  let listings = await Listing.findAll({
    where: {
      user_id: user.id,
    },
    order: [['createdAt', 'DESC']],
  });

  let userCompany = await CompanyModel.findOne({ where: { user_id: user.id } });
  let response = listings.map((listing) => {
    return {
      ...listing.dataValues,
    };
  });
  res.status(200).json(response);
  return next();
});

listingRouter.get('/thumbnail-image', async (req, res, next) => {
  let listing_id = req.query.listing_id;
  if (!listing_id) {
    return next(new HttpError(404, 'not_found'));
  }

  let image = await Image.findOne({
    where: { listing_id: listing_id as string },
  });
  if (!image) {
    return next(new HttpError(404, 'not_found'));
  }

  const thumbnailUrl = await s3Service.generateFileUrlFromBucket(
    image.id,
    EXP_TIME
  );
  res.json({ url: thumbnailUrl });
  return next();
});

listingRouter.get('/fbx', async (req, res, next) => {
  let listing_id = req.query.listing_id;
  if (!listing_id) {
    return next(new HttpError(404, 'not_found'));
  }

  let listing = await Listing.findByPk(listing_id as string);
  if (!listing) {
    return next(new HttpError(404, 'not_found'));
  }

  const fbxFileUrl = await s3Service.generateFileUrlFromBucket(
    listing.id + listing.file_extension,
    EXP_TIME
  );
  res.json({ url: fbxFileUrl });
  return next();
});

listingRouter.delete('/', async (req, res, next) => {
  let listing_id = req.query.listing_id;

  if (!listing_id) {
    return next(new HttpError(404, 'not_found'));
  }

  let listing = await Listing.findByPk(listing_id as string);

  if (!listing) {
    return next(new HttpError(404, 'not_found'));
  }

  await listing.destroy();

  res.status(200).send();

  return next();
});

export default listingRouter;
