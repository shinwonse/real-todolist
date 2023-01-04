import { config } from 'dotenv';

config();

export const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  ORIGIN,
  CREDENTIALS,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI
} = process.env;