import axios from '@/api/axios';
import { KAKAO_AUTHORIZATION_URL } from '@/constants';
import Router from '@/Router';
import { deleteToken } from '@/utils';

export const kakaoLogin = () => (location.href = KAKAO_AUTHORIZATION_URL);

export const logout = () => {
  deleteToken();
  Router.push('/login');
};

export const getUser = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.get('/oauth/islogin', { headers });
  return data;
};
