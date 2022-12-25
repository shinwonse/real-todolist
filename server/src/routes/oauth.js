const express = require('express');
const router = express.Router();

const oauthController = require('../controllers/oauth');

router.get('/kakao/callback', oauthController.kakaoCallback);

module.exports = router;
