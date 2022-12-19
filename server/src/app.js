const connectRedis = require('connect-redis');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const redis = require('redis');

const { CLIENT_BASE_URI } = require('./config/client');
const { MONGO_ID, MONGO_PW, MONGO_URI } = require('./config/mongo');
const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
} = require('./config/redis');
const routes = require('./routes');

dotenv.config();

const app = express();
app.use(
  cors({
    origin: CLIENT_BASE_URI,
    credentials: true,
  })
);

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  legacyMode: true,
});

const sessionOption = {
  resave: false,
  saveUninitialized: true,
  secret: 'secret',
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'auth',
  store: new RedisStore({ client: redisClient, prefix: 'auth' }),
};

app.use(session(sessionOption));

(async () => {
  await redisClient.connect();
})();
app.use(session(sessionOption));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log('✅ Connected to port 3000');
});

mongoose
  .set('strictQuery', false)
  .connect(`mongodb+srv://${MONGO_ID}:${MONGO_PW}@${MONGO_URI}`)
  .then(() => console.log(`✅ Connected to DB`))
  .catch((e) => console.log(`❌ Error on DB connection: ${e}`));
