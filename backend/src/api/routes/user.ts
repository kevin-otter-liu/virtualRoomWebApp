import { Router, Request, Response, NextFunction } from 'express';
import UserModel from '../../db/models/User';
const userRouter = Router();

userRouter.post('/', async (req, res, next) => {
  const payload = {
    username: 'kevin',
    password: 'asf121rqasfa',
  };
  await UserModel.create(payload);
});

export default userRouter;
