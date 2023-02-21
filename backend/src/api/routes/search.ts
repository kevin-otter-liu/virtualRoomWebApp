import { Router } from 'express';
import Listing from '../../db/models/Listing';
import { Op } from 'sequelize';
import Image from '../../db/models/Image';
import { HttpError } from '../../libs/http-error';
import s3Service from '../services/s3Client';

const searchRouter = Router();
const EXP_TIME = 60 * 60;

searchRouter.get('/', async (req, res, next) => {
  let search_factors = req.query.search_factors;
  console.log(search_factors);

  let listings = await Listing.findAll({
    where: {
      [Op.or]: [
        {
          name: { [Op.like]: `%${search_factors}%` },
        },
        {
          location: { [Op.like]: `%${search_factors}%` },
        },
        { developer: { [Op.like]: `%${search_factors}%` } },
      ],
    },
    include: ['image'],
  });

  res.json(listings);
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
