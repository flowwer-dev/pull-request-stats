const get = require('lodash.get');
const parseUser = require('./parseUser');
const parseReview = require('./parseReview');

const filterNullAuthor = ({ author }) => !!(author || {}).login;

const getFilteredReviews = (data) => get(data, 'node.reviews.nodes', []).filter(filterNullAuthor);

module.exports = (data = {}) => {
  const author = parseUser(get(data, 'node.author'));
  const publishedAt = new Date(get(data, 'node.publishedAt'));
  const additions = get(data, 'node.additions');
  const deletions = get(data, 'node.deletions');
  const handleReviews = (review) => parseReview(review, { publishedAt, authorLogin: author.login });

  return {
    author,
    additions,
    deletions,
    publishedAt,
    cursor: data.cursor,
    id: get(data, 'node.id'),
    lines: additions + deletions,
    reviews: getFilteredReviews(data).map(handleReviews),
  };
};
