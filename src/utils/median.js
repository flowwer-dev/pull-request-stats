const average = require('./average');

const intSort = (a, b) => a - b;

module.exports = (list) => {
  const sorted = (list || []).sort(intSort);
  const middle = Math.floor(sorted.length / 2);
  const isOdd = sorted.length % 2 !== 0;
  if (isOdd) return sorted[middle] || null;
  return average(sorted.slice(middle - 1, middle + 1));
};
