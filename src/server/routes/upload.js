const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const db = require('../models');

const router = express.Router();

const { User } = db;

const uploadDir = path.resolve(__dirname, '../../../uploads');
const upload = multer({ dest: uploadDir });

router.post('/', upload.single('avatar'), async (req, res) => {
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
        const { filename } = req.file;
        const avatarImgSrc = `/public/images/${filename}`;
        await User.update(
          { avatarImgSrc },
          { where: { id: userId } },
        );
        res.status(200).send({ avatarImgSrc });
      }
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(400).send(err);
    }
  }
});


module.exports = router;
