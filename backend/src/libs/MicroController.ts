import { RequestHandler } from 'express';
export default class MicroController {
  functionality: RequestHandler;

  constructor(functionality: RequestHandler) {
    this.functionality = functionality;
  }
}
