import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

class OauthRoutes {
  public path = '/oauth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/kakao`, this.authController.goRedirectURL);
    this.router.get(`${this.path}/kakao/callback`, this.authController.getKakaoRedirect);
    this.router.get(`${this.path}/logout`, this.authController.logout);
  }
}

export default OauthRoutes;