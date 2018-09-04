const express = require('express');

const db = require('../models');

const router = express.Router();

const { User, Item } = db;

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
      include: [{
        association: User.Items,
        include: [Item.User],
      }],
    });
    res.status(200).send({ user });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(400).send(err);
  }
});

module.exports = router;
