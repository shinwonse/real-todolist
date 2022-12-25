const { User } = require('../models/user');

exports.getUser = async (req, res) => {
  User.findOne({ _id: req.session.loggedUser._id })
    .populate('toDos')
    .exec((err, user) => {
      if (err) return res.json(err);
      res.send(user);
    });
};

/**
 * get all users
 * */
exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.json(e);
    });
};

// exports.getUser = (req, res) => {};
