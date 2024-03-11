const SORT_KEY = {
  TIME: 'timeToReview',
  REVIEWS: 'totalReviews',
  COMMENTS: 'totalComments',
};

const COLUMNS_ORDER = ['totalReviews', 'reviewPerPrs', 'timeToReview', 'totalComments'];

const STATS_OPTIMIZATION = {
  totalReviews: 'MAX',
  totalComments: 'MAX',
  commentsPerReview: 'MAX',
  timeToReview: 'MIN',
  reviewPerPrs: 'MAX',
};

const STATS = Object.keys(STATS_OPTIMIZATION);

module.exports = {
  SORT_KEY,
  COLUMNS_ORDER,
  STATS,
  STATS_OPTIMIZATION,
};
