import { Router } from 'express';
import Listing from '../../db/models/Listing';
const { Op } = require('sequelize');

const searchRouter = Router();

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
  });

  res.json(listings);
});

export default searchRouter;
