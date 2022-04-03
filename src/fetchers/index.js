const fetchPullRequestById = require('./fetchPullRequestById');
const fetchPullRequests = require('./fetchPullRequests');
const fetchSponsorships = require('./fetchSponsorships');
const postToSlack = require('./postToSlack');
const updatePullRequest = require('./updatePullRequest');

module.exports = {
  fetchPullRequestById,
  fetchPullRequests,
  fetchSponsorships,
  postToSlack,
  updatePullRequest,
};
