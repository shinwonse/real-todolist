const dotenv = require('dotenv');

dotenv.config();

const CLIENT_REDIRECT_URI = process.env.CLIENT_REDIRECT_URI;

module.exports = { CLIENT_REDIRECT_URI };
