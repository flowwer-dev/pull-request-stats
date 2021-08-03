const { TABLE_TITLE } = require('../constants');

module.exports = (pullRequest) => {
  const { body } = pullRequest || {};

  const regexp = new RegExp(`(^|\\n)(${TABLE_TITLE})\\n`);
  return regexp.test(body);
};
