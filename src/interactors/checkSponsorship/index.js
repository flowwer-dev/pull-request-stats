/* eslint-disable no-unused-vars */
const { fetchSponsorships } = require('../../fetchers');
const getLogins = require('./getLogins');
const isSponsoring = require('./isSponsoring');
const isExternalSponsor = require('./isExternalSponsor');

module.exports = async ({
  octokit,
  org,
  repos,
}) => true;
