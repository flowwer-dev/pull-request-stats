const TITLES = [
  '',
  'User',
  'Median time to review',
  'Total reviews',
  'Total comments'
];

const STATS_OPTIMIZATION = {
  totalReviews: 'MAX',
  totalComments: 'MAX',
  commentsPerReview: 'MAX',
  timeToReview: 'MIN'
};

const STATS = Object.keys(STATS_OPTIMIZATION);

module.exports = {
  TITLES,
  STATS,
  STATS_OPTIMIZATION
};
