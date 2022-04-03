const { t } = require('../i18n');

module.exports = (pullRequest) => {
  const { body } = pullRequest || {};

  const regexp = new RegExp(`(^|\\n)(## ${t('table.title')})\\n`);
  return regexp.test(body);
};
