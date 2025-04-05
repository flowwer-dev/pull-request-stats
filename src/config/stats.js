const { durationToString, isNil } = require('../utils');

const noParse = (value) => String(value ?? '-');

const toFixed = (decimals = 0) => (value) => {
  if (isNil(value)) return '-';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
};

const minutesToString = (value) => durationToString(value * 60 * 1000);

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
  cognitiveEffortScore: {
    id: 'cognitiveEffortScore',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
  estimatedWritingTime: {
    id: 'estimatedWritingTime',
    sortOrder: 'DESC',
    parser: minutesToString,
  },
  constructiveComments: {
    id: 'constructiveComments',
    sortOrder: 'DESC',
    parser: toFixed(0),
  },
};

const VALID_STATS = Object.keys(STATS);

const AI_STATS = [
  STATS.cognitiveEffortScore.id,
  STATS.estimatedWritingTime.id,
  STATS.constructiveComments.id,
];

const DEFAULT_STATS = [
  STATS.totalReviews.id,
  STATS.timeToReview.id,
  STATS.totalComments.id,
];

module.exports = {
  STATS,
  AI_STATS,
  VALID_STATS,
  DEFAULT_STATS,
};
