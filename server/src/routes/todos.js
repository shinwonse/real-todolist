const express = require('express');
const router = express.Router();

const todosController = require('../controllers/todos');

router.get('/', todosController.getTodos);
router.post('/', todosController.postTodo);
router.delete('/', todosController.deleteTodo);
router.put('/:id', todosController.putTodo);

module.exports = router;
