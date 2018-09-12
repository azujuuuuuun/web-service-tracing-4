const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

const { User, Item, Tag } = db;

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    const token = jwt.sign({ userId: user.id }, 'shhhhh');
    res.status(200).send({ token, user });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, password } });
    if (!user) {
      res.status(400).send('User was not found.');
    } else {
      const token = jwt.sign({ userId: user.id }, 'shhhhh');
      res.status(200).send({ token, user });
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

router.post('/auth', async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(400).send('Token was undefined');
  } else {
    try {
      const decoded = jwt.verify(token, 'shhhhh');
      const { userId } = decoded;
      const user = await User.findById(userId, {
        include: [{
          association: User.Likes,
        }, {
          association: User.Stocks,
          include: [Item.User, Item.Likers, Item.Comments],
        }, {
          association: User.Followings,
        }, {
          association: User.Followers,
        }, {
          association: User.FollowingTags,
          include: [{
            association: Tag.Items,
            include: [Item.User, Item.Likers, Item.Tags],
          }, {
            association: Tag.Followers,
          }],
        }, {
          association: User.Notifications,
        }],
      });
      if (!user) {
        res.status(400).send('User was not found');
      } else {
        res.status(200).send({ user });
      }
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
      res.status(400).send(e);
    }
  }
});

module.exports = router;
