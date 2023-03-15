const fs = require('fs/promises');
const { join } = require('path');

const PATH = '../../talker.json';

const readTalkers = async () => {
  const data = await fs.readFile(join(__dirname, PATH));
  return JSON.parse(data);
};

const writeTalker = async (content) => fs
  .writeFile(join(__dirname, PATH), JSON.stringify(content, null, 2));

const addingNewTalker = async (talker) => {
  const data = await readTalkers();
  const talkerId = data
    .reduce((talk, { id }) => (id > talk ? id : talk), 0);

  const newTalker = {
    id: talkerId + 1,
    ...talker,
  };

  data.push(newTalker);

  await writeTalker(data);

  return newTalker;
};

const updateTalker = async (id, { name, age, talk }) => {
  const data = await readTalkers();

  if (!data.some((talkPerson) => talkPerson.id === id)) {
    return false;
  }

  const editData = data.map((talkPerson) => ((talkPerson.id === id)
    ? { id, name, age, talk }
    : talkPerson));

  await writeTalker(editData);

  return { id, name, age, talk };
};

module.exports = {
  readTalkers,
  addingNewTalker,
  updateTalker,
};