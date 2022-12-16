import Controller from '../../libs/Controller';
import MicroController from '../../libs/MicroController';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const testController = new Controller();

// define MicroControllers that handle requests
const callback: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('HIHIHI test passed');
  next();
};

const microController = new MicroController(callback);

// register micro controllers in controller
testController.registerMicroController('MC1', microController);

export default testController;
