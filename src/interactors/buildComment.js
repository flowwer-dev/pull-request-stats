const { TABLE_TITLE } = require('../constants');

const getMessage = (periodLength) => {
  if (periodLength === 1) return 'Stats for the last day:';
  return `Stats for the last ${periodLength} days:`;
};

module.exports = ({ table, periodLength }) => {
  const message = getMessage(periodLength);
  return `${TABLE_TITLE}\n${message}\n${table}`;
};
