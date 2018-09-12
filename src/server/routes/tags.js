const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

const {
  Tag, Item, User, UserTag,
} = db;

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: [Tag.Followers] });
    res.status(200).send({ tags });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

router.get('/:tagName', async (req, res) => {
  try {
    const { tagName } = req.params;
    const tag = await Tag.findOne({
      where: { name: tagName },
      include: [{
        association: Tag.Items,
        include: [Item.User, Item.Likers, Item.Tags],
      }, {
        association: Tag.Followers,
      }],
    });
    if (!tag) {
      res.sendStatus(404);
    } else {
      res.status(200).send({ tag });
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

router.post('/:tagId/follow', async (req, res) => {
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
        const { tagId } = req.params;
        const userTag = await UserTag.create({ userId, tagId });
        res.status(200).send({ userTag });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

router.delete('/:tagId/unfollow', async (req, res) => {
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
        const { tagId } = req.params;
        await UserTag.destroy({ where: { userId, tagId } });
        res.sendStatus(204);
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

module.exports = router;
