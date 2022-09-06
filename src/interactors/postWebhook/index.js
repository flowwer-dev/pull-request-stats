const { t } = require('../../i18n');
const { postToWebhook } = require('../../fetchers');
const buildPayload = require('./buildPayload');

module.exports = async ({
  org,
  repos,
  core,
  webhook,
  reviewers,
  periodLength,
}) => {
  if (!webhook) {
    core.debug(t('integrations.webhook.logs.notConfigured'));
    return;
  }

  const payload = buildPayload({
    org,
    repos,
    reviewers,
    periodLength,
  });

  const params = { payload, webhook };

  core.debug(t('integrations.webhook.logs.posting', {
    params: JSON.stringify(params, null, 2),
  }));

  await postToWebhook({ payload, webhook }).catch((error) => {
    core.error(t('integrations.webhook.errors.requestFailed', { error }));
    throw error;
  });

  core.debug(t('integrations.webhook.logs.success'));
};
