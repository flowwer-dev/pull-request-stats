const average = require('./average');

module.exports = (list) => {
  const sorted = (list || []).sort();
  const middle = Math.floor(sorted.length / 2);
  const isOdd = sorted.length % 2 !== 0;
  if (isOdd) return sorted[middle] || null;
  return average(sorted.slice(middle - 1, middle + 1));
};
