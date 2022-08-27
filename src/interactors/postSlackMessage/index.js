const { t } = require('../../i18n');
const { postToSlack } = require('../../fetchers');
const buildSlackMessage = require('./buildSlackMessage');
const splitInChunks = require('./splitInChunks');

module.exports = async ({
  org,
  repos,
  core,
  slack,
  isSponsor,
  reviewers,
  periodLength,
  disableLinks,
  displayCharts,
  pullRequest = null,
}) => {
  const { webhook, channel } = slack || {};

  if (!webhook || !channel) {
    core.debug('Slack integration is disabled. No webhook or channel configured.');
    return;
  }

  if (!isSponsor) {
    core.error('Slack integration is a premium feature, available to sponsors.');
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
    core.debug(`Post a Slack message with params: ${JSON.stringify(params, null, 2)}`);
    return postToSlack(params);
  };

  const fullMessage = buildSlackMessage({
    org,
    repos,
    reviewers,
    pullRequest,
    periodLength,
    disableLinks,
    displayCharts,
  });

  const chunks = splitInChunks(fullMessage);
  await chunks.reduce(async (promise, message) => {
    await promise;
    return send(message).catch((error) => {
      core.error(`Error posting Slack message: ${error}`);
      throw error;
    });
  }, Promise.resolve());

  core.debug('Successfully posted to slack');
};
