const { fetchSponsorships } = require('../../fetchers');
const getLogins = require('./getLogins');
const isSponsoring = require('./isSponsoring');
const isExternalSponsor = require('./isExternalSponsor');

module.exports = async ({
  octokit,
  org,
  repos,
}) => {
  const logins = getLogins({ org, repos });
  const { user } = await fetchSponsorships({ octokit, logins });
  return isSponsoring(user) || isExternalSponsor(logins);
};
