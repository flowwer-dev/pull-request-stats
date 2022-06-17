const commentOnPullRequest = require('./commentOnPullRequest');
const fetchPullRequestById = require('./fetchPullRequestById');
const fetchPullRequests = require('./fetchPullRequests');
const fetchSponsorships = require('./fetchSponsorships');
const postToSlack = require('./postToSlack');
const updatePullRequest = require('./updatePullRequest');

module.exports = {
  commentOnPullRequest,
  fetchPullRequestById,
  fetchPullRequests,
  fetchSponsorships,
  postToSlack,
  updatePullRequest,
};
