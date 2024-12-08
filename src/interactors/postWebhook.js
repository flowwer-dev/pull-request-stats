const { t } = require('../i18n');
const { postToWebhook } = require('../fetchers');

module.exports = async ({
  core,
  payload,
  webhook,
}) => {
  if (!webhook) {
    core.debug(t('integrations.webhook.logs.notConfigured'));
    return;
  }

  const params = { payload, webhook };
  core.debug(t('integrations.webhook.logs.posting', {
    params: JSON.stringify(params, null, 2),
  }));

  await postToWebhook(params).catch((error) => {
    core.error(t('integrations.webhook.errors.requestFailed', { error }));
    throw error;
  });

  core.debug(t('integrations.webhook.logs.success'));
};
