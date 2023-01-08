export const SERVER_BASE_URI = process.env.SERVER_BASE_URI;
export const KAKAO_AUTHORIZATION_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
export const GITHUB_REDIRECT_URL = process.env.GITHUB_REDIRECT_URL;
