import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import { CREDENTIALS, ORIGIN_DEV, ORIGIN_PRODUCTION, PORT } from './config/env';
import Routes from './routes';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.env !== 'test' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} ========`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await AppDataSource.initialize()
      .then(() => {
        console.log('DataSource Connect Success!');
      })
      .catch((err) => {
        console.error('DataSource Connect Error!!');
        console.log(err);
      });
    // await RedisClient.connect()
    //   .then(() => {
    //     console.log('Redis Connect Success!');
    //   })
    //   .catch((err) => {
    //     console.error('Redis Connect Error!!');
    //     console.log(err);
    //   });
    console.info(`=================================`);
  }

  private initializeMiddlewares() {
    this.app.set('trust proxy', true);
    this.app.use(
      cors({
        origin: this.env == 'production' ? ORIGIN_PRODUCTION : ORIGIN_DEV,
        credentials: Boolean(CREDENTIALS),
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.use(new Routes().router);
    this.app.use('/', (req, res, next) => {
      const data = `Hello World!`;
      res.send(data);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
