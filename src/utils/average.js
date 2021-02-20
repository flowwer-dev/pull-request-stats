const sum = require('./sum');

module.exports = (list) => {
  if (!list.length) return null;
  return sum(list) / list.length;
};
