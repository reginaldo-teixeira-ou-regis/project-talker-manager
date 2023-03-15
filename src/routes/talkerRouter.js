const express = require('express');

const tokenValidation = require('../middlewares/talker/tokenValidation');
const nameValidation = require('../middlewares/talker/nameValidation');
const ageValidation = require('../middlewares/talker/ageValidation');
const talkValidation = require('../middlewares/talker/talkValidation');
const watchedAtValidation = require('../middlewares/talker/watchedAtValidation');
const rateValidation = require('../middlewares/talker/rateValidation');

const { readTalkers, addingNewTalker, updateTalker } = require('../utils/fs/index');

const router = express.Router();

router.use(express.json());

router.get('/', async (_req, res) => {
  const data = await readTalkers();

  return res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readTalkers();
  const talkerPerson = data.find(({ id: findId }) => findId === Number(id));

  if (!talkerPerson) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talkerPerson);
});

router.post('/',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const newTalker = await addingNewTalker({
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  });

  return res.status(201).json(newTalker);
  });

router.put('/:id', 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
  const { id } = req.params;
  const talkerPerson = req.body;

  const editTalker = await updateTalker(Number(id), talkerPerson);

  if (!editTalker) {
    return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(editTalker);
});

module.exports = router;