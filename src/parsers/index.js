const parseComment = require('./parse-comment');
const parsePullRequest = require('./parse-pull-request');
const parseReview = require('./parse-review');
const parseUser = require('./parse-user');

module.exports = {
  parseComment,
  parsePullRequest,
  parseReview,
  parseUser
};
