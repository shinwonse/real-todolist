import axios from '@/api/axios';
import Router from '@/Router';
import { deleteToken } from '@/utils';

const KAKAO_AUTHORIZATION_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;

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
