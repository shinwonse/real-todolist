const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/logout', usersController.logout);
router.get('/', usersController.getUser);

module.exports = router;
