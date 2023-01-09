import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import {
  DataStoredInToken,
  RequestWithUser,
} from '../interfaces/auth.interface';
import { User } from '../entities/user.entity';
import { JWT_SECRET_KEY } from '../config/env';
import { HttpException } from '../exceptions/HttpException';

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Authorization = req.header('authorization').split('Bearer ')[1];
    if (Authorization) {
      const secretKey: string = JWT_SECRET_KEY;
      const { id } = (await verify(
        Authorization,
        secretKey,
      )) as DataStoredInToken;
      const findUser = await User.findOne({
        where: { user_id: id },
        select: ['user_id', 'nickname', 'kakao_id'],
      });
      console.log(findUser);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'No authentication token'));
  }
};

export default authMiddleware;
