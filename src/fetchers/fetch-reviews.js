const { parseReview } = require('../parsers');

const RESULTS_PER_PAGE = 100;

module.exports = ({
  octokit,
  repo,
  owner,
  pullNumber,
  pullOwnerId
}) => {
  const getBatch = async (page) => {
    const response = await octokit.pulls.listReviews({
      owner,
      repo,
      page,
      pull_number: pullNumber,
      per_page: RESULTS_PER_PAGE
    }).catch(error => {
      throw new Error(`Error fetching reviews from pull request "${pullNumber}" of repo "${owner}/${repo}". Error: ${error}`);
    });

    return response.data.map(item => parseReview(item, pullOwnerId));
  };

  const execute = async (page) => {
    const batch = await getBatch(page);
    const next = batch.length === RESULTS_PER_PAGE ? await execute(page + 1) : [];
    return [...batch, ...next];
  };

  return execute(0);
};
