import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import qs from 'qs';
import {
  CLIENT_REDIRECT_URI_DEV,
  CLIENT_REDIRECT_URI_PRODUCTION,
  JWT_SECRET_KEY,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI_DEV,
  KAKAO_REDIRECT_URI_PRODUCTION,
} from '../config/env';
import UsersService from '../services/users.service';
import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { isEmpty } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  DataStoredInToken,
  RequestWithUser,
  TokenData,
} from '../interfaces/auth.interface';
import { sign } from 'jsonwebtoken';

class AuthController {
  public usersService = new UsersService();
  private redirectURI =
    process.env.NODE_ENV == 'production'
      ? CLIENT_REDIRECT_URI_PRODUCTION
      : CLIENT_REDIRECT_URI_DEV;
  private kakaoRedirectURI =
    process.env.NODE_ENV == 'production'
      ? KAKAO_REDIRECT_URI_PRODUCTION
      : KAKAO_REDIRECT_URI_DEV;

  public goRedirectURL = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${this.kakaoRedirectURI}&response_type=code`;

      res.redirect(kakaoAuthUrl);
    } catch (error) {
      next(error);
    }
  };

  public getKakaoRedirect = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    console.log(this.redirectURI, this.kakaoRedirectURI);
    // 인증 코드를 먼저 받아오는 부분
    let kakaoTokenRequest;
    try {
      kakaoTokenRequest = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          client_id: KAKAO_CLIENT_ID,
          grant_type: 'authorization_code',
          redirect_uri: this.kakaoRedirectURI,
          code: req.query.code,
        }),
      });
    } catch (error) {
      next(error);
    }

    console.info(kakaoTokenRequest.data);
    let kakaoUserData;

    // 받아온 코드로 유저 정보 가져오는 부분
    try {
      const { access_token } = kakaoTokenRequest.data;
      kakaoUserData = await axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      next(error);
    }

    console.info(kakaoUserData.data);
    const kakaoId: number = kakaoUserData.data.id;
    const kakaoNickname: string = kakaoUserData.data.properties.nickname;

    try {
      let loginUser: User = await this.usersService.findUserByKakaoId(kakaoId);

      // 가입된 유저가 있는지 확인하고 없으면 생성
      if (isEmpty(loginUser)) {
        const userData = plainToInstance(UserDto, {
          nickname: kakaoNickname,
          is_kakao: true,
          kakao_id: kakaoId,
        });
        loginUser = await this.usersService.createUser(userData);
      }

      // req.session.isLogin = true;
      // req.session.loginedUser = loginUser;
      // console.log(req.session);
      // req.session.save((err) => {
      //   console.log('세션 저장');
      //   console.log(err);
      // });
      // console.log(redirectURI);
      // res.redirect('https://real-todolist.vercel.app');
      const tokenData = this.createToken(loginUser);
      res.redirect(this.redirectURI + `?token=${tokenData.token}`);
      // res.redirect(this.redirectURI + '/' + qs.stringify(tokenData));
    } catch (error) {
      next(error);
    }
  };

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.user_id };
    const secretKey: string = JWT_SECRET_KEY;
    const expiresIn: number = 60 * 60 * 60 * 30;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    res.redirect(this.redirectURI);
  };

  public islogin = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    if (req.user) {
      res.status(200).json({ data: 'logined', user: req.user });
    } else {
      res.status(401).json({ data: 'Not logined' });
    }
  };
}

export default AuthController;
