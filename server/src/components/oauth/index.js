const express = require('express');
const router = express.Router();

router.get('/kakao/callback', (req, res) => {
  const { code } = req.query;
  res.send(code);
});

module.exports = router;
