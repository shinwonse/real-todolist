const express = require('express');

const { User } = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    const filter = { _id: req.session.loggedUser._id };
    const user = await User.findOne(filter);
    return res.send(user);
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

router.post('/todo', async (req, res) => {
  if (req.session.loggedIn) {
    const newTodo = req.body.text;
    const filter = { _id: req.session.loggedUser._id };
    const { toDos } = await User.findOne(filter);
    toDos.push(newTodo);
    await User.findOneAndUpdate(filter, { toDos });
    return res.send(toDos);
  }
  res.end();
});

router.delete('/todo', async (req, res) => {
  if (req.session.loggedIn) {
    const deleteIndex = req.body.index;
    const filter = { _id: req.session.loggedUser._id };
    const { toDos } = await User.findOne(filter);
    toDos.splice(deleteIndex, 1);
    await User.findOneAndUpdate(filter, { toDos });
    return res.send(toDos);
  }
  res.end();
});

router.put('/todo', async (req, res) => {
  if (req.session.loggedIn) {
    const { index, text, completed } = req.body;
    const filter = { _id: req.session.loggedUser._id };
    const { toDos } = await User.findOne(filter);
    toDos[index] = { text, completed };
    await User.findOneAndUpdate(filter, { toDos });
    return res.send(toDos);
  }
  res.end();
});

module.exports = router;
