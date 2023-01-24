const { t } = require('../../i18n');
const { postToWebhook } = require('../../fetchers');
const { TeamsSplitter } = require('../../services/splitter');
const buildMessage = require('./buildMessage');
const buildPayload = require('./buildPayload');

const DELAY = 500;

module.exports = async ({
  org,
  repos,
  core,
  teams,
  reviewers,
  periodLength,
  disableLinks,
  displayCharts,
  pullRequest = null,
}) => {
  const { webhook } = teams || {};

  if (!webhook) {
    core.debug(t('integrations.teams.logs.notConfigured'));
    return;
  }

  const send = (body) => {
    const params = {
      webhook,
      payload: buildPayload(body),
    };
    core.debug(t('integrations.teams.logs.posting', {
      params: JSON.stringify(params, null, 2),
    }));
    return postToWebhook(params);
  };

  const fullMessage = buildMessage({
    org,
    repos,
    reviewers,
    pullRequest,
    periodLength,
    disableLinks,
    displayCharts,
  });

  const { chunks } = new TeamsSplitter({ message: fullMessage });
  await chunks.reduce(async (promise, message) => {
    await promise;
    await send(message).catch((error) => {
      core.error(t('integrations.teams.errors.requestFailed', { error }));
      throw error;
    });
    // Delaying between requests to prevent rate limiting
    // https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using?tabs=cURL#rate-limiting-for-connectors
    await new Promise((resolve) => setTimeout(resolve, DELAY));
  }, Promise.resolve());

  core.debug(t('integrations.teams.logs.success'));
};
