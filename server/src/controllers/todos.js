const { Todo } = require('../models/todo');
const { User } = require('../models/user');

/**
 * 새로운 투두를 등록한다.
 */
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

/**
 * 투두를 하나 삭제한다.
 * */
exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  res.send(id);
};

/**
 * 투두 하나를 수정한다.및
 * */
exports.putTodo = (req, res) => {};
