const { t } = require('../../i18n');

module.exports = async ({
  core,
  content,
}) => {
  core.debug(t('integrations.summary.logs.posting', { content }));

  try {
    await core
      .summary
      .addRaw(`\n${content}`, true)
      .write();
    core.debug(t('integrations.summary.logs.success'));
  } catch (error) {
    core.error(t('integrations.summary.errors.writeFailed', { error }));
  }
};
