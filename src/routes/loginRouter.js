const express = require('express');

const emailValidation = require('../middlewares/login/emailValidation');
const passwordValidation = require('../middlewares/login/passwordValidation');

const generateToken = require('../utils/generateToken');

const router = express.Router();

router.use(express.json());

router.post('/', emailValidation, passwordValidation, (req, res) => {
  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = router;