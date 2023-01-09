import UsersService from '../services/users.service';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { plainToInstance } from 'class-transformer';

class UsersController {
  public userService = new UsersService();

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUsers();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findUsersData: User = await this.userService.findUser(userId);

      res.status(200).json({ data: findUsersData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userData: UserDto = plainToInstance(UserDto, req.body);
      const createUserData = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
