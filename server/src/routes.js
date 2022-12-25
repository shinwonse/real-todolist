const express = require('express');
const router = express.Router();

const oauth = require('./routes/oauth');
const todos = require('./routes/todos');
const users = require('./routes/users');

router.use('/todos', todos);
router.use('/oauth', oauth);
router.use('/users', users);

module.exports = router;
