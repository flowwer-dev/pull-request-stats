const { t } = require('../../i18n');
const { postToSlack } = require('../../fetchers');
const { SlackSplitter } = require('../../services/splitter');
const buildMessage = require('./buildMessage');

module.exports = async ({
  core,
  org,
  repos,
  slack,
  isSponsor,
  table,
  periodLength,
  pullRequest = null,
}) => {
  const { webhook, channel } = slack || {};

  if (!webhook || !channel) {
    core.debug(t('integrations.slack.logs.notConfigured'));
    return;
  }

  if (!isSponsor) {
    core.setFailed(t('integrations.slack.errors.notSponsor'));
    return;
  }

  const send = (message) => {
    const params = {
      webhook,
      channel,
      message,
      iconUrl: t('table.icon'),
      username: t('table.title'),
    };
    core.debug(t('integrations.slack.logs.posting', {
      params: JSON.stringify(params, null, 2),
    }));
    return postToSlack(params);
  };

  const fullMessage = buildMessage({
    org,
    repos,
    table,
    pullRequest,
    periodLength,
  });

  const { chunks } = new SlackSplitter({ message: fullMessage });
  await chunks.reduce(async (promise, message) => {
    await promise;
    return send(message).catch((error) => {
      core.error(t('integrations.slack.errors.requestFailed', { error }));
      throw error;
    });
  }, Promise.resolve());

  core.debug(t('integrations.slack.logs.success'));
};
