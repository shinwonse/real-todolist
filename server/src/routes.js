const express = require('express');
const router = express.Router();

const login = require('./components/login');
const users = require('./components/users');

router.use('/users', users);
router.use('/login', login);

module.exports = router;
