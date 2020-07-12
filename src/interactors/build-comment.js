const getMessage = (periodLength) => {
  if (periodLength === 1) return 'Pull reviewers stats for the last day:';
  return `Pull reviewers stats for the lasts ${periodLength} days:`;
};

module.exports = ({ table, periodLength }) => {
  const message = getMessage(periodLength);
  return `${message}\n${table}`;
};
