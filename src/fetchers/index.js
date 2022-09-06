const commentOnPullRequest = require('./commentOnPullRequest');
const fetchPullRequestById = require('./fetchPullRequestById');
const fetchPullRequests = require('./fetchPullRequests');
const fetchSponsorships = require('./fetchSponsorships');
const postToSlack = require('./postToSlack');
const postToWebhook = require('./postToWebhook');
const updatePullRequest = require('./updatePullRequest');

module.exports = {
  commentOnPullRequest,
  fetchPullRequestById,
  fetchPullRequests,
  fetchSponsorships,
  postToSlack,
  postToWebhook,
  updatePullRequest,
};
