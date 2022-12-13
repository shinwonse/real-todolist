const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const host = 'https://kauth.kakao.com';
  res.redirect(
    `${host}/oauth/authorize?client_id=b7b1a22f9072cb8cf1479960e9e10414&redirect_uri=http://localhost:3000/todolist&response_type=code`
  );
});

module.exports = router;
