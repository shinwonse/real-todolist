const dotenv = require('dotenv');

dotenv.config();

const MONGO_ID = process.env.MONGO_ID;
const MONGO_PW = process.env.MONGO_PW;
const MONGO_URI = process.env.MONGO_URI;

module.exports = { MONGO_ID, MONGO_PW, MONGO_URI };
