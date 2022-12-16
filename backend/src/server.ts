import express, { Express, Request, Response, Router } from 'express';
import 'dotenv/config';
import router from './api/routes/testRoute';
import userRouter from './api/routes/user';
import { Sequelize } from 'sequelize';
import dbConn from './db/config';
import * as Models from './db/models';

const port: number = parseInt(process.env.SERVER_PORT!) || 3000;

class Server {
  private port: number;
  private static server: Express;
  private static db: Sequelize;

  constructor(port: number, dbConn: Sequelize) {
    this.port = port;
    Server.server = express();

    // register middleware for parsing request body to json
    Server.server.use(express.json());
    Server.server.use(express.urlencoded({ extended: true }));

    // connect to database
    Server.db = dbConn;

    dbConn.sync().then(() => {
      console.log('database synced');
    });
    console.log('Database connection successfully established');
  }

  public start(): Server {
    Server.server.listen(this.port, () => {
      console.log(`Express Server is listening at port:${this.port}`);
    });
    return this;
  }

  public async testDatabaseConnection() {
    try {
      await Server.db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  public getExpressServer(): Express {
    return Server.server;
  }

  // registers a route
  public registerRoute(path: string, router: Router) {
    Server.server.use(path, router);
  }
}

// initialise server
const AppServer = new Server(port, dbConn);

// registering all routes
AppServer.registerRoute('/', router);
AppServer.registerRoute('/user', userRouter);

AppServer.start();
