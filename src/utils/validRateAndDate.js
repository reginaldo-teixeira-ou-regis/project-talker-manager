// const { isExists } = require('date-fns');

// const validDate = (date) => {
//   const [year, month, day] = date.split('/').reverse();
//   return isExists(Number(year), Number(month), Number(day));
// };

const validDate = (date) => {
  const [day, month, year] = date.split('/');
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === Number(year)
    && d.getMonth() === Number(month) - 1
    && d.getDate() === Number(day);
};

const validRate = (rate) => typeof rate === 'number'
  && rate <= 5 && rate >= 1 && Number.isInteger(rate);

module.exports = {
  validDate,
  validRate,
};