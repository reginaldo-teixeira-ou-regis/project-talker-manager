const express = require('express');

const tokenValidation = require('../middlewares/talker/tokenValidation');
const nameValidation = require('../middlewares/talker/nameValidation');
const ageValidation = require('../middlewares/talker/ageValidation');
const talkValidation = require('../middlewares/talker/talkValidation');
const watchedAtValidation = require('../middlewares/talker/watchedAtValidation');
const rateValidation = require('../middlewares/talker/rateValidation');
const rateAndDateValidation = require('../middlewares/talker/rateAndDateValidation');

const { findAll } = require('../db/talkerQueryDB');
const { validRate } = require('../utils/validRateAndDate');
const searchQueries = require('../utils/searchQueries');

const {
  readTalkers,
  addingNewTalker,
  updateTalker,
  deleteTalker,
  updateTalkerRate,
} = require('../utils/fs/index');

const router = express.Router();

router.use(express.json());

router.get('/', async (_req, res) => {
  const data = await readTalkers();

  return res.status(200).json(data);
});

router.get('/search', tokenValidation, rateAndDateValidation, async (req, res) => {
  const data = await searchQueries(req.query);

  return res.status(200).json(data);
});

router.get('/db', async (_req, res) => {
  const [data] = await findAll();
  const formatData = data.map(({
    id, name, age, talk_watched_at: watchedAt, talk_rate: rate,
  }) => ({
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  }));

  res.status(200).json(formatData);
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

router.patch('/rate/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;

  if (!rate && rate !== 0) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!validRate(Number(rate))) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  const editTalker = await updateTalkerRate(Number(id), Number(rate));

  if (!editTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(204).json();
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

router.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;

  const removeTalker = await deleteTalker(Number(id));

  if (!removeTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(204).json();
});

module.exports = router;