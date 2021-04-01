const TITLES = [
  '',
  'User',
  'Avg. time to first review',
  'Total pull reviews',
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
