const express = require('express');
const router = express.Router();

router.get('/kakao/callback', (req, res) => {
  res.send('hello world');
});

module.exports = router;
