const dotenv = require('dotenv');

dotenv.config();

const CLIENT_BASE_URI = process.env.CLIENT_BASE_URI;
const CLIENT_REDIRECT_URI = process.env.CLIENT_REDIRECT_URI;

module.exports = { CLIENT_BASE_URI, CLIENT_REDIRECT_URI };
