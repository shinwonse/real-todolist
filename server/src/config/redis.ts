import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from './env';

const RedisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  legacyMode: true
});

RedisClient.on('error', (err: any) => {
  console.log('redis client error', err);
});

export default RedisClient;