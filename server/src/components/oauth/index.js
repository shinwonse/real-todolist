const axios = require('axios');
const express = require('express');
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

  if ('access_token' in kakaoTokenRequest.data) {
    const { access_token } = kakaoTokenRequest.data;
    const kakaoUserRequest = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.send(kakaoUserRequest.data);
  } else {
    res.send('fail');
  }
});

module.exports = router;
