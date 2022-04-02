const core = require('@actions/core');
const github = require('@actions/github');
const { subtractDaysToDate } = require('./utils');
const { Telemetry } = require('./services');
const {
  getPulls,
  buildTable,
  postComment,
  getReviewers,
  buildComment,
  getPullRequest,
  checkSponsorship,
  alreadyPublished,
} = require('./interactors');

const run = async (params) => {
  const {
    org,
    repos,
    limit,
    sortBy,
    octokit,
    periodLength,
    disableLinks,
    displayCharts,
    pullRequestId,
  } = params;

  const pullRequest = await getPullRequest({ octokit, pullRequestId });
  if (alreadyPublished(pullRequest)) {
    core.info('Skipping execution because stats are published already');
    return;
  }

  const startDate = subtractDaysToDate(new Date(), periodLength);
  const pulls = await getPulls({
    octokit, org, repos, startDate,
  });
  core.info(`Found ${pulls.length} pull requests to analyze`);

  const reviewers = getReviewers(pulls);
  core.info(`Analyzed stats for ${reviewers.length} pull request reviewers`);

  const table = buildTable(reviewers, {
    limit,
    sortBy,
    disableLinks,
    periodLength,
    displayCharts,
  });
  core.debug('Stats table built successfully');

  const content = buildComment({ table, periodLength });
  core.debug(`Commit content built successfully: ${content}`);

  await postComment({
    octokit,
    content,
    pullRequestId,
    currentBody: pullRequest.body,
  });
  core.debug('Posted comment successfully');
};

module.exports = async (params) => {
  core.debug(`Params: ${JSON.stringify(params, null, 2)}`);

  const { githubToken, org, repos } = params;
  const octokit = github.getOctokit(githubToken);
  const isSponsor = await checkSponsorship({ octokit, org, repos });
  const telemetry = new Telemetry({ core, isSponsor, telemetry: params.telemetry });
  if (isSponsor) core.info('Thanks for sponsoring this project! 💙');

  try {
    telemetry.start(params);
    await run({ ...params, octokit });
    telemetry.success();
  } catch (error) {
    telemetry.error(error);
    throw error;
  }
};
