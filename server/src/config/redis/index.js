const dotenv = require('dotenv');

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

module.exports = { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD };
