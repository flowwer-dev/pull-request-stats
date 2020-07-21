const core = require('@actions/core');
const github = require('@actions/github');
const { subtractDaysToDate } = require('./utils');
const {
  getRepoPulls,
  getReviewers,
  calculateReviewerStats,
  buildTable,
  buildComment,
  postComment,
  trackError,
  trackRun,
  trackSuccess
} = require('./interactors');
const getPullRequests = async ({ repositories, octokit, startDate }) => {
  return repositories.reduce(async (promise, repository) => {
    const prevPulls = await promise;
    const [owner, repo] = repository.split('/');

    const pulls = await getRepoPulls({
      octokit, owner, repo, startDate
    });

    return [ ...prevPulls, ...pulls ];
  }, Promise.resolve([]));
};

const run = async (params) => {
  const {
    githubToken,
    periodLength,
    repositories,
    displayCharts,
    sortBy,
    currentRepo,
    sha
  } = params;
  core.debug(`Params: ${JSON.stringify(params, null, 2)}`);

  const octokit = github.getOctokit(githubToken);
  const startDate = subtractDaysToDate(new Date(), periodLength);

  const pulls = await getPullRequests({ repositories, octokit, startDate });
  core.info(`Found ${pulls.length} pull requests to analyze`);

  const reviewers = getReviewers(pulls).map(reviewer => {
    const stats = calculateReviewerStats(pulls, reviewer.id);
    return { ...reviewer, stats };
  });
  core.info(`Analyzed stats for ${reviewers.length} pull request reviewers`);

  const table = buildTable(reviewers, { displayCharts, sortBy });
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
