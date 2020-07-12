const github = require('@actions/github');
const { subtractDaysToDate } = require('./utils');
const {
  getRepoPulls,
  getReviewers,
  calculateReviewerStats,
  buildTable,
  buildComment,
  postComment
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

module.exports = async ({
  githubToken,
  periodLength,
  repositories,
  displayCharts,
  sortBy,
  currentRepo,
  sha
}) => {
  const octokit = github.getOctokit(githubToken);
  const startDate = subtractDaysToDate(new Date(), periodLength);

  const pulls = await getPullRequests({ repositories, octokit, startDate });

  const reviewers = getReviewers(pulls).map(reviewer => {
    const stats = calculateReviewerStats(pulls, reviewer.id);
    return { ...reviewer, stats };
  });

  const table = buildTable(reviewers, { displayCharts, sortBy });
  const content = buildComment({ table, periodLength });

  await postComment({ octokit, content, sha, repository: currentRepo });
};
