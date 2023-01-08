import { Router } from 'express';
import OauthRoutes from './routes/oauth.routes';
import UsersRoutes from './routes/users.routes';
import TodosRoutes from "./routes/todos.routes";

class Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(new TodosRoutes().router);
    this.router.use(new OauthRoutes().router);
    this.router.use(new UsersRoutes().router);
  }
}

export default Routes;