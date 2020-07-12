const { parsePullRequest } = require('../parsers');

const RESULTS_PER_PAGE = 100;
const SORT = 'created';
const SORT_DIRECTION = 'desc';
const STATE = 'all';

module.exports = ({
  octokit,
  owner,
  repo,
  startDate
}) => {
  const getBatch = async (page) => {
    const response = await octokit.pulls.list({
      owner,
      repo,
      page,
      per_page: RESULTS_PER_PAGE,
      state: STATE,
      sort: SORT,
      direction: SORT_DIRECTION
    }).catch(error => {
      throw new Error(`Error fetching pull requests from repo "${owner}/${repo}". Error: ${error}`);
    });

    return response.data
      .map(parsePullRequest)
      .filter((pr) => pr.createdAt >= startDate);
  };

  const execute = async (page) => {
    const batch = await getBatch(page);
    const next = batch.length === RESULTS_PER_PAGE ? await execute(page + 1) : [];
    return [...batch, ...next];
  };

  return execute(0);
};
