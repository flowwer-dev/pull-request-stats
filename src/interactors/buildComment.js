const { t } = require('../i18n');

module.exports = ({ table, periodLength }) => {
  const message = t('table.subtitle', { count: periodLength });
  return `## ${t('table.title')}\n${message}:\n${table}`;
};
