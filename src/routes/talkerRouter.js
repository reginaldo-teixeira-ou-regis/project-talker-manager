const express = require('express');
const { readTalkersAll } = require('../utils/fs/index');

const router = express.Router();

router.use(express.json());

router.get('/', async (_req, res) => {
  const data = await readTalkersAll();

  return res.status(200).json(data);
});

module.exports = router;