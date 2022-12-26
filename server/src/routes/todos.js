const express = require('express');
const router = express.Router();

const todosController = require('../controllers/todos');

router.post('/', todosController.postTodo);
router.delete('/:id', todosController.deleteTodo);
router.put('/:id', todosController.putTodo);

module.exports = router;
