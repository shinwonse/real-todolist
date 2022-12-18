const express = require('express');

const { Todo } = require('../toDos/model');
const router = express.Router();

router.get('/:nickname', (req, res) => {
  const { nickname } = req.params;
  res.send(nickname);
});

router.get('/:nickname/todos', (req, res) => {
  Todo.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

router.post('/:nickname/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save((err, todo) => {
    if (err) {
      res.send(err);
    }
    res.json(todo);
  });
});

router.delete('/:nickname/todos/:todoID', (req, res) => {
  Todo.deleteOne({ _id: req.params.todoID })
    .then(() => res.json({ message: 'Todo Deleted' }))
    .catch((err) => res.send(err));
});

router.put('/:nickname/todos/:todoID', (req, res) => {
  Todo.findOneAndUpdate(
    { _id: req.params.todoID },
    { $set: { text: req.body.text } },
    { new: true },
    (err, Todo) => {
      if (err) {
        res.send(err);
      } else res.json(Todo);
    }
  );
});

module.exports = router;
