import axios from '@/api/axios';
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from '@/constants';
import Router from '@/Router';
import { deleteToken } from '@/utils';

// const KAKAO_AUTHORIZATION_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
const KAKAO_AUTHORIZATION_URL = `https://kauth.kakao.com/oauth/authorize?client_id=e6f625075c7051ea84103a3d42dc9a36&redirect_uri=https://real-todolist.herokuapp.com/oauth/kakao/redirect&response_type=code`;
console.log(KAKAO_AUTHORIZATION_URL);

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
