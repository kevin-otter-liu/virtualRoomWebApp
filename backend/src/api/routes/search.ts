import { Router } from 'express';
import Listing from '../../db/models/Listing';
import { Op } from 'sequelize';
import Image from '../../db/models/Image';
import { HttpError } from '../../libs/http-error';
import s3Service from '../services/s3Client';
import CompanyModel from '../../db/models/Company';
import UserModel from '../../db/models/User';

const searchRouter = Router();
const EXP_TIME = 60 * 60;

searchRouter.get('/', async (req, res, next) => {
  // search factors include company name, project name, location
  let search_factors = req.query.search_factors;
  // console.log(search_factors);

  // let company = await CompanyModel.findOne({
  //   where: { company_name: { [Op.like]: `%${search_factors}%` } },
  // });

  // console.log(`company: ${company?.dataValues}`);

  // // find the company owner
  // let user: any;

  // if (company) {
  //   user = await UserModel.findByPk(company.user_id);
  // }
  // console.log(`user:${user}`);

  // find listing by project name or location
  let listings = await Listing.findAll({
    where: {
      [Op.or]: [
        {
          name: { [Op.iLike]: `%${search_factors}%` },
        },
        {
          location: { [Op.iLike]: `%${search_factors}%` },
        },
        {
          developer_name: { [Op.iLike]: `%${search_factors}%` },
        },
      ],
    },
    include: ['image'],
  });

  let response = listings.map((listing) => {
    return {
      ...listing.dataValues,
    };
  });

  res.status(200).json(response);
  return next();
});

searchRouter.get('/thumbnail-image', async (req, res, next) => {
  let image_id = req.query.image_id;
  if (!image_id) {
    return next(new HttpError(404, 'not_found'));
  }

  let image = await Image.findByPk(image_id as string);
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
export default searchRouter;
