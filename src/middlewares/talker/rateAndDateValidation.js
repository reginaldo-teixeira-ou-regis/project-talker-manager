const { validRate, validDate } = require('../../utils/validRateAndDate');

const rateAndDateValidation = (req, res, next) => {
  const { rate, date } = req.query;

  if (rate && !validRate(Number(rate))) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  if (date && !validDate(date)) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = rateAndDateValidation;