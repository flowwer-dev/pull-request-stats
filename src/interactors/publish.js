const buildTable = require('./buildTable');
const buildComment = require('./buildComment');
const buildJsonOutput = require('./buildJsonOutput');
const buildMarkdown = require('./buildMarkdown');
const postComment = require('./postComment');
const postSlackMessage = require('./postSlackMessage');
const postSummary = require('./postSummary');
const postTeamsMessage = require('./postTeamsMessage');
const postWebhook = require('./postWebhook');

module.exports = async ({
  core,
  octokit,
  entries,
  pullRequest,
  inputs,
}) => {
  const {
    org,
    repos,
    mainStats,
    limit,
    sortBy,
    periodLength,
    disableLinks,
    displayCharts,
    publishAs,
    pullRequestId,
    isSponsor,
  } = inputs;

  const table = buildTable({
    entries,
    limit,
    sortBy,
    mainStats,
    disableLinks,
    displayCharts,
  });
  core.debug('Table content built successfully');

  const markdownTable = buildMarkdown({ table });
  core.debug('Markdown table built successfully');

  const content = buildComment({
    org,
    repos,
    periodLength,
    markdownTable,
    isSponsor,
  });
  core.debug(`Commit content built successfully: ${content}`);

  const whParams = {
    core,
    org,
    repos,
    table,
    periodLength,
    pullRequest,
    isSponsor,
  };
  const jsonOutput = buildJsonOutput({ inputs, entries, pullRequest });
  await postWebhook({ core, payload: jsonOutput, webhook: inputs.webhook });
  await postSlackMessage({ ...whParams, slack: inputs.slack });
  await postTeamsMessage({ ...whParams, teams: inputs.teams });
  await postSummary({ core, content });
  await core.setOutput('resultsMd', markdownTable);
  await core.setOutput('resultsJson', jsonOutput);

  if (pullRequestId) {
    await postComment({
      octokit,
      content,
      publishAs,
      pullRequestId,
      currentBody: pullRequest.body,
    });
    core.debug('Posted comment successfully');
  }
};
