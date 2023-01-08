import axios from 'axios';

import { KAKAO_AUTHORIZATION_URL } from '@/constants';
import Router from '@/Router';

export const kakaoLogin = () => {
  location.href = KAKAO_AUTHORIZATION_URL;
};

export const logout = () => {
  axios.get('https://real-todolist.herokuapp.com/oauth/logout').then(() => {
    Router.push('/login');
  });
};
