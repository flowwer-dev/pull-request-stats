const { t } = require('../i18n');

const TITLE_REGEXP = new RegExp(`(^|\\n)(## ${t('table.title')})\\n`);

const isActionComment = (body) => body && TITLE_REGEXP.test(body);

module.exports = (pullRequest) => {
  if (!pullRequest) return false;
  const { body, comments } = pullRequest || {};
  const bodies = [body, ...(comments || []).map((c) => c.body)];
  return bodies.some(isActionComment);
};
