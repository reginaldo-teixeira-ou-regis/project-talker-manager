const { readTalkers } = require('./fs');

const hasQuery = (query1, query2) => (query1 ? query2 === query1 : true);

const searchQueries = async ({ q = '', rate = NaN, date = '' }) => {
  const data = await readTalkers();

  return data.filter((talker) => (
      talker.name.includes(q || '')
      && hasQuery(date, talker.talk.watchedAt)
      && hasQuery(Number(rate), talker.talk.rate)
    ));
};

module.exports = searchQueries;