const { parseComment } = require('../parsers');

const RESULTS_PER_PAGE = 100;
const SORT = 'created';
const SORT_DIRECTION = 'desc';

module.exports = ({
  octokit,
  repo,
  owner,
  pullNumber,
  pullOwnerId
}) => {
  const getBatch = async (page) => {
    const response = await octokit.pulls.listReviewComments({
      owner,
      repo,
      page,
      pull_number: pullNumber,
      per_page: RESULTS_PER_PAGE,
      sort: SORT,
      direction: SORT_DIRECTION
    }).catch(error => {
      throw new Error(`Error fetching comments from pull request "${pullNumber}" of repo "${owner}/${repo}". Error: ${error}`);
    });

    return response.data.map(item => parseComment(item, pullOwnerId));
  };

  const execute = async (page) => {
    const batch = await getBatch(page);
    const next = batch.length === RESULTS_PER_PAGE ? await execute(page + 1) : [];
    return [...batch, ...next];
  };

  return execute(0);
};
