import jwt from 'jsonwebtoken';
import { HttpError } from '../../libs/http-error';
import UserModel from '../../db/models/User';
import { RequestHandler, Request } from 'express';

export interface CustomRequest extends Request {
  user: UserModel;
}

export const checkAuth: RequestHandler = async (req, res, next) => {
  const serverSecret = process.env.SERVER_SECRET!;
  if (!req.headers.authorization) {
    return next(new HttpError(423, 'missing authorization'));
  }

  const authorisationHeaders = req.headers.authorization.split(' ');
  if (authorisationHeaders.length < 2) {
    return next(new HttpError(423, 'missing authorisation'));
  }

  if (authorisationHeaders[0] !== 'Bearer') {
    return next(new HttpError(423, 'wrong authorisation type'));
  }

  if (authorisationHeaders[1] === 'null') {
    return next(new HttpError(423, 'no access_token attached'));
  }

  let access_token = authorisationHeaders[1];

  if (!access_token) {
    return next(new HttpError(423, 'missing authorization'));
  }

  const payload = jwt.verify(access_token, serverSecret);
  console.log('here');
  console.log(payload);
  type payload = {
    user_id: string;
    exp: number;
  };

  const { user_id, exp } = payload as payload;

  // check if token expired
  let user = await UserModel.findByPk(user_id);

  if (!user) {
    return next(new HttpError(404, 'user_not_found'));
  }

  // check expiry time of jwt
  let currentTime = new Date();
  let jwt_expire_at = new Date(exp * 1000);

  if (jwt_expire_at.getTime() < currentTime.getTime()) {
    return next(new HttpError(404, 'token_expired'));
  }

  // get user and append to req body to pass thru middleware
  (req as CustomRequest).user = user;
  console.log(user);
  next();
};
