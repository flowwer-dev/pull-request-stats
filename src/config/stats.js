const { durationToString, isNil } = require('../utils');

const noParse = (value) => String(value ?? '-');

const toFixed = (decimals = 0) => (value) => {
  if (isNil(value)) return '-';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
};

const STATS = {
  totalReviews: {
    id: 'totalReviews',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  totalComments: {
    id: 'totalComments',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  timeToReview: {
    id: 'timeToReview',
    sortOrder: 'ASC',
    parser: durationToString,
  },
  commentsPerReview: {
    id: 'commentsPerReview',
    sortOrder: 'DESC',
    parser: toFixed(2),
  },
  reviewedAdditions: {
    id: 'reviewedAdditions',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  reviewedDeletions: {
    id: 'reviewedDeletions',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  reviewedLines: {
    id: 'reviewedLines',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  openedPullRequests: {
    id: 'openedPullRequests',
    sortOrder: 'DESC',
    parser: noParse,
  },
  totalObservations: {
    id: 'totalObservations',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  medianObservations: {
    id: 'medianObservations',
    sortOrder: 'DESC',
    parser: toFixed(2),
  },
  revisionSuccessRate: {
    id: 'revisionSuccessRate',
    sortOrder: 'DESC',
    parser: toFixed(2),
  },
  additions: {
    id: 'additions',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  deletions: {
    id: 'deletions',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  lines: {
    id: 'lines',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
};

const VALID_STATS = Object.keys(STATS);

const DEFAULT_STATS = ['totalReviews', 'timeToReview', 'totalComments'];

module.exports = {
  STATS,
  VALID_STATS,
  DEFAULT_STATS,
};
