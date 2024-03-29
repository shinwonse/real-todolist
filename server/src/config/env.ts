import { config } from 'dotenv';

config();

export const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  ORIGIN_DEV,
  ORIGIN_PRODUCTION,
  CREDENTIALS,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
  CLIENT_REDIRECT_URI_DEV,
  CLIENT_REDIRECT_URI_PRODUCTION,
  JWT_SECRET_KEY,
} = process.env;
