const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

const { User, Notification } = db;

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
        const { notificationKinds } = req.body;
        const records = Object.keys(notificationKinds).map(k => ({
          kind: k,
          userId,
        }));
        await Notification.destroy({ where: { userId } });
        const notifications = await Notification.bulkCreate(records);
        res.status(200).send({ notifications });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});

module.exports = router;
