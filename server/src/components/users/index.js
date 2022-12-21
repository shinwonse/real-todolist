const express = require('express');

const { Todo } = require('../toDos/model');

const { User } = require('./model');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    return res.send(req.session);
  }
  res.status(401).send('로그인이 필요합니다.');
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.clearCookie('auth');
    return res.status(200).send('로그아웃 되었습니다.');
  });
});

router.get('/:nickname', (req, res) => {
  if (req.cookies.auth) {
    User.findOne({ nickname: req.params.nickname }, (err, user) => {
      if (err) return res.status(500).json({ error: err });
      if (!user) return res.status(404).json({ error: 'User not found' });
      return res.status(200).json(user);
    });
  } else res.status(404).send('로그인이 필요합니다.');
});

router.get('/:nickname/todos', (req, res) => {
  res.end();
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
