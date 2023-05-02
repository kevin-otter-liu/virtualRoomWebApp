import { Router } from 'express';
import UserModel from '../../db/models/User';
import { HttpError } from '../../libs/http-error';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { checkAuth } from '../middleware/check-auth';
import CompanyModel from '../../db/models/Company';
const userRouter = Router();

type CompanyDetails = {
  companyName: string;
  companyEmail: string;
  companyLocation: string;
};

userRouter.post('/sign-up', async (req, res, next) => {
  const { username, password } = req.body;
  const companyDetails: CompanyDetails = req.body.companyDetails;

  // check user not in database
  const foundUser = await UserModel.findOne({
    where: { username: username },
  });

  if (foundUser) {
    return next(new HttpError(423, 'username already exists'));
  }

  // encrypt password salt + hashing
  const serverSecret = process.env.SERVER_SECRET!;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await UserModel.create({
    id: uuidv4(),
    username: username,
    password: hashedPassword,
    type: companyDetails ? 'company' : 'buyer',
  });

  if (companyDetails) {
    await CompanyModel.create({
      id: uuidv4(),
      company_name: companyDetails.companyName,
      company_email: companyDetails.companyEmail,
      company_location: companyDetails.companyLocation,
      user_id: user.id,
    });
  }

  // create JWT token for user

  let currentDate = new Date();
  let expireDate = new Date(currentDate.getTime() + 60 * 60 * 1000);
  const access_token = jwt.sign(
    {
      user_id: user.dataValues.id,
    },
    serverSecret,
    {
      expiresIn: '1hr',
    }
  );

  res.status(200).json({
    access_token: access_token,
    expires_at: expireDate,
    type: user.type,
  });
  return next();
});

userRouter.post('/sign-in', async (req, res, next) => {
  const { username, password } = req.body;

  // check user not in database
  const user = await UserModel.findOne({
    where: { username: username },
  });

  if (!user) {
    return next(new HttpError(423, 'username does not exist'));
  }

  // compare password
  let authenticated = bcrypt.compare(password, user.password);

  if (!authenticated) {
    return next(new HttpError(423, 'wrong password'));
  }

  // creat JWT token for user
  let currentDate = new Date();
  let expireDate = new Date(currentDate.getTime() + 60 * 60 * 1000);
  const serverSecret = process.env.SERVER_SECRET!;
  const access_token = jwt.sign(
    {
      user_id: user.dataValues.id,
    },
    serverSecret,
    {
      expiresIn: '1hr',
    }
  );

  res.status(200).json({
    access_token: access_token,
    expires_at: expireDate,
    type: user.type,
  });
  next();
});

userRouter.get('/check-auth', checkAuth, (req, res, next) => {
  res.status(200).send();
  next();
});

export default userRouter;
