const core = require('@actions/core');
const github = require('@actions/github');
const { t } = require('./i18n');
const { subtractDaysToDate } = require('./utils');
const { Telemetry } = require('./services');
const { fetchPullRequestById } = require('./fetchers');
const { getGithubApiUrl } = require('./config');
const {
  getPulls,
  buildTable,
  postComment,
  fulfillEntries,
  getPullRequestStats,
  getReviewStats,
  getUsers,
  mergeStats,
  buildComment,
  buildJsonOutput,
  buildMarkdown,
  checkSponsorship,
  alreadyPublished,
  postSlackMessage,
  postSummary,
  postTeamsMessage,
  postWebhook,
} = require('./interactors');

const run = async (params) => {
  const {
    org,
    repos,
    limit,
    sortBy,
    octokit,
    mainStats,
    publishAs,
    periodLength,
    disableLinks,
    personalToken,
    displayCharts,
    pullRequestId,
  } = params;

  const pullRequest = pullRequestId
    ? await fetchPullRequestById(octokit, pullRequestId)
    : null;

  if (alreadyPublished(pullRequest)) {
    core.info('Skipping execution because stats are published already');
    return null;
  }

  const pulls = await getPulls({
    org,
    repos,
    octokit: github.getOctokit(personalToken, { baseUrl: getGithubApiUrl() }),
    startDate: subtractDaysToDate(new Date(), periodLength),
  });
  core.info(`Found ${pulls.length} pull requests to analyze`);

  const users = await getUsers(pulls, { excludeStr: params.excludeStr });
  core.info(`Found ${users.length} collaborators to analyze`);

  const pullRequestStats = getPullRequestStats(pulls);
  core.info(`Analyzed stats for ${pullRequestStats.length} authors`);

  const reviewStats = getReviewStats(pulls);
  core.info(`Analyzed stats for ${reviewStats.length} reviewers`);

  const entries = fulfillEntries(
    mergeStats({ users, pullRequestStats, reviewStats }),
    { periodLength },
  );
  core.debug(`Analyzed users: ${entries.length}`);

  const table = buildTable({
    limit,
    sortBy,
    entries,
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
    isSponsor: params.isSponsor,
  });
  core.debug(`Commit content built successfully: ${content}`);

  const whParams = {
    core,
    org,
    repos,
    table,
    periodLength,
    pullRequest,
    isSponsor: params.isSponsor,
  };
  const jsonOutput = buildJsonOutput({ params, entries, pullRequest });
  await postWebhook({ core, payload: jsonOutput, webhook: params.webhook });
  await postSlackMessage({ ...whParams, slack: params.slack });
  await postTeamsMessage({ ...whParams, teams: params.teams });
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

  return {
    entries,
    pullRequest,
  };
};

module.exports = async (params) => {
  core.debug(`Params: ${JSON.stringify(params, null, 2)}`);

  const { githubToken, org, repos } = params;
  const octokit = github.getOctokit(githubToken, { baseUrl: getGithubApiUrl() });
  const isSponsor = await checkSponsorship({ octokit, org, repos });
  const telemetry = new Telemetry({ core, isSponsor, telemetry: params.telemetry });
  if (isSponsor) core.info(t('execution.logs.sponsors'));

  try {
    telemetry.start(params);
    const results = await run({ ...params, isSponsor, octokit });
    telemetry.success(results);
  } catch (error) {
    telemetry.error(error);
    throw error;
  }
};
