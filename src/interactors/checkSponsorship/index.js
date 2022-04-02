const { fetchSponsorships } = require('../../fetchers');
const getLogins = require('./getLogins');
const isSponsoring = require('./isSponsoring');

module.exports = async ({
  octokit,
  org,
  repos,
}) => {
  const logins = getLogins({ org, repos });
  const { user } = await fetchSponsorships({ octokit, logins });
  return isSponsoring(user);
};
