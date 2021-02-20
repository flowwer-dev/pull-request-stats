const core = require('@actions/core');
const github = require('@actions/github');
const { subtractDaysToDate } = require('./utils');
const {
  getPulls,
  getReviewers,
  buildTable,
  buildComment,
  postComment,
  trackError,
  trackRun,
  trackSuccess
} = require('./interactors');

const run = async (params) => {
  const {
    githubToken,
    periodLength,
    org,
    repos,
    displayCharts,
    disableLinks,
    sortBy,
    currentRepo,
    sha
  } = params;
  core.debug(`Params: ${JSON.stringify(params, null, 2)}`);

  const octokit = github.getOctokit(githubToken);
  const startDate = subtractDaysToDate(new Date(), periodLength);
  const pulls = await getPulls({ octokit, org, repos, startDate });
  core.info(`Found ${pulls.length} pull requests to analyze`);

  const reviewers = getReviewers(pulls);
  core.info(`Analyzed stats for ${reviewers.length} pull request reviewers`);

  const table = buildTable(reviewers, { displayCharts, disableLinks, sortBy, periodLength });
  core.debug('Stats table built successfully');

  const content = buildComment({ table, periodLength });
  core.debug(`Commit content built successfully: ${content}`);

  await postComment({ octokit, content, sha, repository: currentRepo });
  core.debug('Posted comment successfully');
};

module.exports = async (params) => {
  try {
    trackRun(params);
    const start = new Date();
    await run(params);
    const end = new Date();
    trackSuccess({ timeMs: end - start })
  } catch (error) {
    trackError(error);
    throw error;
  }
};
