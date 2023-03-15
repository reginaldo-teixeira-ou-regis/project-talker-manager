const validRate = (rate) => typeof rate === 'number'
  && rate <= 5 && rate >= 1 && Number.isInteger(rate);

module.exports = validRate;