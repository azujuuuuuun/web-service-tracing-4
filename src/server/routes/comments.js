const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

const { User, Comment } = db;

router.post('/', async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(400).send('Token was undefined');
  } else {
    try {
      const decoded = jwt.verify(token, 'shhhhh');
      const { userId } = decoded;
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).send('User was not found');
      } else {
        const { text, itemId } = req.body;
        const comment = await Comment.create({ text, userId, itemId });
        comment.dataValues.user = user;
        res.status(200).send({ comment });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

module.exports = router;