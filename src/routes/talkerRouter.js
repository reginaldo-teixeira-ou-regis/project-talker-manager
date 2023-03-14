const express = require('express');
const { readTalkersAll } = require('../utils/fs/index');

const router = express.Router();

router.use(express.json());

router.get('/', async (_req, res) => {
  const data = await readTalkersAll();

  return res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readTalkersAll();
  const talkerPerson = data.find(({ id: findId }) => findId === Number(id));

  if (!talkerPerson) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talkerPerson);
});

module.exports = router;