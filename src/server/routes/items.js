const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

const {
  sequelize, User, Item, Tag, ItemTag, Comment, Like, Stock,
} = db;

router.post('/', async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(400).send('Token was undefined');
  } else {
    const transaction = await sequelize.transaction();
    try {
      const decoded = jwt.verify(token, 'shhhhh');
      const { userId } = decoded;
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).send('User was not found');
      } else {
        const { title, tagNames, body } = req.body;
        const item = await Item.create(
          { title, body, userId },
          { transaction },
        );
        const tags = await Promise.all(
          tagNames.split(' ').map(async (t) => {
            const [tag] = await Tag.findOrCreate({
              where: { name: t },
              defaults: { name: t },
              transaction,
            });
            return tag;
          }),
        );
        await Promise.all(tags.map(t => (
          ItemTag.create(
            { itemId: item.id, tagId: t.id },
            { transaction },
          )
        )));
        item.dataValues.user = user;
        item.dataValues.tags = tags;
        await transaction.commit();
        res.status(200).send({ item });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      await transaction.rollback();
      res.status(400).send(err);
    }
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [Item.User],
    });
    res.status(200).send({ items });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

router.get('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({
      where: { id: itemId },
      include: [{
        association: Item.User,
      }, {
        association: Item.Tags,
      }, {
        association: Item.Likers,
      }, {
        association: Item.Comments,
        include: [Comment.User],
      }],
    });
    if (!item) {
      res.sendStatus(404);
    } else {
      res.status(200).send({ item });
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

router.post('/:itemId/like', async (req, res) => {
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
        const { itemId } = req.params;
        const like = await Like.create({ userId, itemId });
        res.status(200).send({ like });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

router.delete('/:itemId/unlike', async (req, res) => {
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
        const { itemId } = req.params;
        await Like.destroy({ where: { userId, itemId } });
        res.sendStatus(204);
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

router.post('/:itemId/stock', async (req, res) => {
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
        const { itemId } = req.params;
        const stock = await Stock.create({ userId, itemId });
        res.status(200).send({ stock });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

router.delete('/:itemId/unstock', async (req, res) => {
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
        const { itemId } = req.params;
        await Stock.destroy({ where: { userId, itemId } });
        res.sendStatus(204);
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

router.post('/:itemId/comments', async (req, res) => {
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
        const { text } = req.body;
        const { itemId } = req.params;
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
