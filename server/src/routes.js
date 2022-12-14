const express = require('express');
const router = express.Router();

const oauth = require('./components/oauth');
const users = require('./components/users');

router.use((req, res) => {
  res.send('Hello World!');
});
router.use('/oauth', oauth);
router.use('/users', users);

module.exports = router;
