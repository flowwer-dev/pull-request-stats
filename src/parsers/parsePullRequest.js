const get = require('lodash.get');
const parseUser = require('./parseUser');
const parseReview = require('./parseReview');

module.exports = (data = {}) => {
  const author = parseUser(get(data, 'node.author'));
  const publishedAt = new Date(get(data, 'node.publishedAt'));
  const handleReviews = (review) => parseReview(review, { publishedAt, authorLogin: author.login });

  return {
    author,
    publishedAt,
    cursor: data.cursor,
    id: get(data, 'node.id'),
    reviews: get(data, 'node.reviews.nodes', []).map(handleReviews),
  };
};
