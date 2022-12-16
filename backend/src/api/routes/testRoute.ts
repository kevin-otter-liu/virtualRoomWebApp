import express, { Request, Response, NextFunction } from 'express';
import testController from '../controllers/testController';

const router = express.Router();

// register all routes with the router
router.get('/test', testController.microControllers.get('MC1')!.functionality);

export default router;
