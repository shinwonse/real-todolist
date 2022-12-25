const { Todo } = require('../models/todo');
const { User } = require('../models/user');

exports.getTodos = (req, res) => {
  if (req.session.loggedIn) {
    return res.send('getTodos!!');
  }
  res.send('로그인이 필요합니다.');
};

exports.postTodo = async (req, res) => {
  await Todo.create({
    text: req.body.text,
    userId: req.session.loggedUser._id,
  })
    .then((todo) => {
      return User.findOneAndUpdate(
        { _id: req.session.loggedUser._id },
        { $push: { toDos: todo._id } },
        { new: true }
      );
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.json(e);
    });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  Todo.deleteOne({ _id: id })
    .then((output) => {
      res.send(output);
    })
    .catch((e) => {
      res.json(e);
    });
};
exports.putTodo = (req, res) => {};
