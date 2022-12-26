const { User } = require('../models/user');

/**
 * 유저의 모든 정보를 가져온다.
 * */
exports.getUser = async (req, res) => {
  User.findOne({ _id: req.session.loggedUser._id })
    .populate('toDos')
    .exec((err, user) => {
      if (err) return res.json(err);
      res.send(user);
    });
};

/**
 * 유저를 로그아웃시킨다.
 * */
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.clearCookie('auth');
    return res.status(200).send('로그아웃 되었습니다.');
  });
};
