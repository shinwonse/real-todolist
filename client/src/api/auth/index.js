import axios from 'axios';

import { KAKAO_AUTHORIZATION_URL } from '@/constants';
import Router from '@/Router';

export const kakaoLogin = () => {
  location.href = KAKAO_AUTHORIZATION_URL;
};

export const logout = () => {
  axios
    .get('http://localhost:3000/api/users/logout', {
      withCredentials: true,
    })
    .then(() => {
      Router.push('/login');
    });
};
