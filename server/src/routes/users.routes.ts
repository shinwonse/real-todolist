import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import { UserDto } from '../dtos/user.dto';

class UsersRoutes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getAllUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUser);
    this.router.post(`${this.path}`, validationMiddleware(UserDto), this.usersController.createUser);
  }
}

export default UsersRoutes;