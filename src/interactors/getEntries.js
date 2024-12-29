const fulfillEntries = require('./fulfillEntries');
const getPullRequestStats = require('./getPullRequestStats');
const getReviewStats = require('./getReviewStats');
const getUsers = require('./getUsers');
const mergeStats = require('./mergeStats');

module.exports = async ({
  core,
  pulls,
  excludeStr,
  includeStr,
  periodLength,
}) => {
  const users = await getUsers(pulls, { excludeStr, includeStr });
  core.info(`Found ${users.length} collaborators to analyze`);
  core.debug(JSON.stringify(users, null, 2));

  const pullRequestStats = getPullRequestStats(pulls);
  core.info(`Analyzed stats for ${pullRequestStats.length} authors`);
  core.debug(JSON.stringify(pullRequestStats, null, 2));

  const reviewStats = getReviewStats(pulls);
  core.info(`Analyzed stats for ${reviewStats.length} reviewers`);
  core.debug(JSON.stringify(reviewStats, null, 2));

  return fulfillEntries(
    mergeStats({ users, pullRequestStats, reviewStats }),
    { periodLength },
  );
};
