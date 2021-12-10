const SORT_KEY = {
  TIME: 'timeToReview',
  REVIEWS: 'totalReviews',
  COMMENTS: 'totalComments',
  COMMENTS_PER_REVIEW: 'commentsPerReview',
};

const TITLES = {
  avatar: '',
  username: 'User',
  timeToReview: 'Median time to review',
  totalReviews: 'Total reviews',
  totalComments: 'Total comments',
  commentsPerReview: 'Comments / review',
};

const COLUMNS_ORDER = ['totalReviews', 'timeToReview', 'totalComments', 'commentsPerReview'];

const STATS_OPTIMIZATION = {
  totalReviews: 'MAX',
  totalComments: 'MAX',
  commentsPerReview: 'MAX',
  timeToReview: 'MIN',
};

const STATS = Object.keys(STATS_OPTIMIZATION);

module.exports = {
  SORT_KEY,
  TITLES,
  COLUMNS_ORDER,
  STATS,
  STATS_OPTIMIZATION,
};
