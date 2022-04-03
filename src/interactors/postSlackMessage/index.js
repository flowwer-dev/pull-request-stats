const { postToSlack } = require('../../fetchers');
const { t } = require('../../i18n');
const buildSlackMessage = require('./buildSlackMessage');

module.exports = async ({
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

  const message = buildSlackMessage({
    reviewers,
    pullRequest,
    periodLength,
    disableLinks,
    displayCharts,
  });

  await postToSlack({
    webhook,
    channel,
    message,
    iconUrl: t('table.icon'),
    username: t('table.title'),
  });
  core.debug('Successfully posted to slack');
};
