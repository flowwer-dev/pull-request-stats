const { durationToString, isNil } = require('../utils');

const noParse = (value) => String(value ?? '-');

const toFixed = (decimals) => (value) => (isNil(value) ? '-' : value.toFixed(decimals));

const STATS = {
  totalReviews: {
    id: 'totalReviews',
    sortOrder: 'DESC',
    parser: noParse,
  },
  timeToReview: {
    id: 'timeToReview',
    sortOrder: 'ASC',
    parser: durationToString,
  },
  totalComments: {
    id: 'totalComments',
    sortOrder: 'DESC',
    parser: noParse,
  },
  commentsPerReview: {
    id: 'commentsPerReview',
    sortOrder: 'DESC',
    parser: toFixed(2),
  },
  openedPullRequests: {
    id: 'openedPullRequests',
    sortOrder: 'DESC',
    parser: noParse,
  },
};

const VALID_STATS = Object.keys(STATS);

const DEFAULT_STATS = ['totalReviews', 'timeToReview', 'totalComments'];

module.exports = {
  STATS,
  VALID_STATS,
  DEFAULT_STATS,
};
