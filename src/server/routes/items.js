const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

const { User, Item } = db;

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
        const { title, body } = req.body;
        const item = await Item.create({ title, body, userId });
        item.dataValues.user = user;
        res.status(200).send({ item });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
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
      include: [Item.User],
    });
    res.status(200).send({ item });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

module.exports = router;
