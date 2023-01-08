import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import { CREDENTIALS, ORIGIN, PORT } from './config/env';
import Routes from './routes';
import RedisClient from './config/redis';
import connectRedis from 'connect-redis';
import session, { Cookie } from 'express-session';
import errorMiddleware from './middlewares/error.middleware';
import { User } from './entities/user.entity';

const RedisStore = connectRedis(session);

declare module 'express-session' {
  interface SessionData {
    loginedUser: User;
    isLogin: boolean;
    cookie: Cookie;
  }
}

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
    await RedisClient.connect()
      .then(() => {
        console.log('Redis Connect Success!');
      })
      .catch((err) => {
        console.error('Redis Connect Error!!');
        console.log(err);
      });
    console.info(`=================================`);
  }

  private initializeMiddlewares() {
    this.app.set('trust proxy', true);
    this.app.use(
      session({
        store: new RedisStore({ client: RedisClient as any, prefix: 'auth:' }),
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
          sameSite: 'none',
          secure: true,
        },
      }),
    );
    this.app.use(cors({ origin: ORIGIN, credentials: Boolean(CREDENTIALS) }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.use(new Routes().router);
    this.app.use('/', (req, res, next) => {
      console.info(req.session);
      let data = `Hello World!`;
      if (req.session.isLogin) {
        data = 'HELLO! ' + req.session.loginedUser.nickname;
      }
      res.send(data);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
