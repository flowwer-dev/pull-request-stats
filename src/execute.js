const core = require('@actions/core');
const github = require('@actions/github');
const { subtractDaysToDate } = require('./utils');
const { Telemetry } = require('./services');
const { fetchPullRequestById } = require('./fetchers');
const { getGithubApiUrl } = require('./config');
const {
  getPulls,
  buildTable,
  postComment,
  getReviewers,
  buildComment,
  setUpReviewers,
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
    publishAs,
    periodLength,
    disableLinks,
    personalToken,
    displayCharts,
    pullRequestId,
    excludeTitleRegex,
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
    excludeTitleRegex,
    octokit: github.getOctokit(personalToken, { baseUrl: getGithubApiUrl() }),
    startDate: subtractDaysToDate(new Date(), periodLength),
  });
  core.info(`Found ${pulls.length} pull requests to analyze`);
  // Log the title of each pull request
  pulls.forEach((pull) => core.debug(`Pull request title: ${pull.title}`));
  const reviewersRaw = getReviewers(pulls, { excludeStr: params.excludeStr });
  core.info(`Analyzed stats for ${reviewersRaw.length} pull request reviewers`);

  const reviewers = setUpReviewers({
    limit,
    sortBy,
    periodLength,
    reviewers: reviewersRaw,
  });
  core.debug(`Analyzed reviewers: ${reviewers}`);

  const table = buildTable({ reviewers, disableLinks, displayCharts });
  core.debug('Stats table built successfully');

  const content = buildComment({
    table, periodLength, org, repos, isSponsor: params.isSponsor,
  });
  core.debug(`Commit content built successfully: ${content}`);

  const whParams = { ...params, core, reviewers };
  await postWebhook(whParams);
  await postSlackMessage({ ...whParams, pullRequest });
  await postTeamsMessage({ ...whParams, pullRequest });
  await postSummary({ core, content });
  await core.setOutput('resultsMd', content);
  await core.setOutput('resultsJson', whParams);

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
    reviewers,
    pullRequest,
  };
};

module.exports = async (params) => {
  core.debug(`Params: ${JSON.stringify(params, null, 2)}`);

  const { githubToken, org, repos } = params;
  const octokit = github.getOctokit(githubToken, { baseUrl: getGithubApiUrl() });
  const isSponsor = await checkSponsorship({ octokit, org, repos });
  const telemetry = new Telemetry({ core, isSponsor, telemetry: params.telemetry });
  if (isSponsor) core.info('Thanks for sponsoring this project! 💙');

  try {
    telemetry.start(params);
    const results = await run({ ...params, isSponsor, octokit });
    telemetry.success(results);
  } catch (error) {
    telemetry.error(error);
    throw error;
  }
};
