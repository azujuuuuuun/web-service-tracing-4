const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

const { User, Item, Relationship } = db;

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
      include: [{
        association: User.Items,
        include: [Item.User],
      }, {
        association: User.FollowingTags,
      }],
    });
    if (!user) {
      res.sendStatus(404);
    } else {
      res.status(200).send({ user });
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).send({ users });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

router.put('/password', async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(400).send('Token was undefined');
  } else {
    try {
      const decoded = jwt.verify(token, 'shhhhh');
      const { userId } = decoded;
      const { currentPassword } = req.body;
      const user = await User.findOne({
        where: {
          id: userId,
          password: currentPassword,
        },
      });
      if (!user) {
        res.status(400).send('User was not found');
      } else {
        const { newPassword } = req.body;
        const result = await User.update({ password: newPassword }, {
          where: { id: userId },
        });
        res.status(200).send({ result });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

router.put('/', async (req, res) => {
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
        const { payload } = req.body;
        const row = await User.update({ ...payload }, {
          where: { id: userId },
        });
        res.status(200).send({ row });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

router.post('/:followedId/follow', async (req, res) => {
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
        const { followedId } = req.params;
        const relationship = await Relationship.create({
          followerId: userId,
          followedId,
        });
        res.status(200).send({ relationship });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

router.delete('/:followedId/unfollow', async (req, res) => {
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
        const { followedId } = req.params;
        await Relationship.destroy({
          where: {
            followerId: userId,
            followedId,
          },
        });
        res.status(204);
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

module.exports = router;
