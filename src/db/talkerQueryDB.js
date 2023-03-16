const connection = require('./connection');

const findAll = () => connection.execute(
  'SELECT * FROM talkers',
);

const findById = (id) => connection.execute(
  'SELECT * FROM talkers WHERE id = ?',
  [id],
);

const insert = (talker) => connection.execute(
  'INSERT INTO talkers (name, age, talk_watched_at, talk_rate) VALUES (?, ?, ?, ?)',
  [talker.name, talker.age, talker.talk.watchedAt, talker.talk.rate],
);

const update = (talker, id) => connection.execute(
  'UPDATE talkers SET name = ?, age = ?, talk_watched_at = ?, talk_rate = ? WHERE id = ?',
  [talker.name, talker.age, talker.talk.watchedAt, talker.talk.rate, id],
);

const remove = (id) => connection.execute(
  'DELETE FROM talkers WHERE id = ?',
  [id],
);

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};