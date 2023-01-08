import axios from '@/api/axios';
import { KAKAO_AUTHORIZATION_URL } from '@/constants';
import Router from '@/Router';

export const kakaoLogin = () => {
  location.href = KAKAO_AUTHORIZATION_URL;
};

export const logout = () => {
  axios.get('/oauth/logout').then(() => {
    Router.push('/login');
  });
};
