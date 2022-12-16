const axios = require('axios');
const express = require('express');

const { User } = require('../users/model');
const router = express.Router();

router.get('/kakao/callback', async (req, res) => {
  const baseUrl = 'https://kauth.kakao.com/oauth/token';
  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    grant_type: 'authorization_code',
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const kakaoTokenRequest = await axios.post(finalUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { access_token } = kakaoTokenRequest.data;
  const kakaoUserData = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });

  const existingUser = await User.findOne({
    nickname: kakaoUserData.data.properties.nickname,
  });
  if (!existingUser) {
    const user = await User.create({
      nickname: kakaoUserData.data.properties.nickname,
    });
    req.session.loggedIn = true;
    req.session.loggedUser = user;
    return res.redirect('http://localhost:8081');
  }
  req.session.loggedIn = true;
  req.session.loggedUser = existingUser;
  return res.redirect('http://localhost:8081');
});

module.exports = router;
