const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('plz 제발');
});

module.exports = router;
