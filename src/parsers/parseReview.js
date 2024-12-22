const get = require('lodash.get');
const parseUser = require('./parseUser');

const APPROVED = 'APPROVED';

module.exports = (data = {}, pullRequest = {}) => {
  const author = parseUser(data.author);
  const isOwnPull = author.login === pullRequest.authorLogin;
  const submittedAt = new Date(data.submittedAt);
  const body = get(data, 'body');
  const state = get(data, 'state');
  const commitDate = new Date(get(data, 'commit.pushedDate'));
  const startDate = Math.max(pullRequest.publishedAt, commitDate);
  const hasBody = !!((body || '').trim());
  const extraComment = hasBody ? 1 : 0;

  return {
    author,
    isOwnPull,
    submittedAt,
    body,
    id: get(data, 'id'),
    state: get(data, 'state'),
    isApproved: state === APPROVED,
    commentsCount: get(data, 'comments.totalCount') + extraComment,
    timeToReview: submittedAt - startDate,
  };
};
