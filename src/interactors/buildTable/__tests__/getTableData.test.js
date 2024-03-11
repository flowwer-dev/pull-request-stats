const { t } = require('../../../i18n');
const reviewers = require('../../__tests__/mocks/populatedReviewers.json');
const getTableData = require('../getTableData');

const bests = {
  totalReviews: 4,
  totalComments: 5,
  commentsPerReview: 5,
  timeToReview: 2052500,
  totalReviewsPerPrs: 0.8,
};

const TITLES = {
  avatar: t('table.columns.avatar'),
  username: t('table.columns.username'),
  timeToReview: t('table.columns.timeToReview'),
  totalReviews: t('table.columns.totalReviews'),
  totalComments: t('table.columns.totalComments'),
  totalReviewsPerPrs: undefined,
};
const TITLES_WITH_REVIEW_PER_PR = {
  avatar: t('table.columns.avatar'),
  username: t('table.columns.username'),
  timeToReview: t('table.columns.timeToReview'),
  totalReviews: t('table.columns.totalReviews'),
  totalComments: t('table.columns.totalComments'),
  totalReviewsPerPrs: t('table.columns.totalReviewsPerPrs'),
};

const AVATAR1 = '<a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a>';
const AVATAR2 = '<a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a>';
const AVATAR1_BIG = '<a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="32"></a>';
const AVATAR2_BIG = '<a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="32"></a>';

const SIMPLE_RESPONSE = [
  TITLES,
  {
    avatar: AVATAR1,
    username: 'user1',
    timeToReview: '[34m](https://app.flowwer.dev/charts/review-time/1)',
    totalReviews: '4',
    totalComments: '1',
  },
  {
    avatar: AVATAR2,
    username: 'user2',
    timeToReview: '[2h 21m](https://app.flowwer.dev/charts/review-time/2)',
    totalReviews: '1',
    totalComments: '5',
  },
];

const CHARTS_RESPONSE = [
  TITLES,
  {
    avatar: AVATAR1_BIG,
    username: 'user1<br/>🥇',
    timeToReview: '[**34m**](https://app.flowwer.dev/charts/review-time/1)<br/>▀▀',
    totalReviews: '**4**<br/>▀▀▀▀▀▀▀▀',
    totalComments: '1<br/>▀▀',
    totalReviewsPerPrs: undefined,
  },
  {
    avatar: AVATAR2_BIG,
    username: 'user2<br/>🥈',
    timeToReview: '[2h 21m](https://app.flowwer.dev/charts/review-time/2)<br/>▀▀▀▀▀▀▀▀',
    totalReviews: '1<br/>▀▀',
    totalComments: '**5**<br/>▀▀▀▀▀▀▀▀',
    totalReviewsPerPrs: undefined,
  },
];

const NO_LINKS_RESPONSE = [
  TITLES,
  {
    avatar: AVATAR1,
    username: 'user1',
    timeToReview: '34m',
    totalReviews: '4',
    totalComments: '1',
  },
  {
    avatar: AVATAR2,
    username: 'user2',
    timeToReview: '2h 21m',
    totalReviews: '1',
    totalComments: '5',
  },
];

const CHARTS_NO_LINKS_RESPONSE = [
  TITLES,
  {
    avatar: AVATAR1_BIG,
    username: 'user1<br/>🥇',
    timeToReview: '**34m**<br/>▀▀',
    totalReviews: '**4**<br/>▀▀▀▀▀▀▀▀',
    totalComments: '1<br/>▀▀',
  },
  {
    avatar: AVATAR2_BIG,
    username: 'user2<br/>🥈',
    timeToReview: '2h 21m<br/>▀▀▀▀▀▀▀▀',
    totalReviews: '1<br/>▀▀',
    totalComments: '**5**<br/>▀▀▀▀▀▀▀▀',
  },
];

const REVIEW_PER_PR_RESPONSE = [
  TITLES_WITH_REVIEW_PER_PR,
  {
    avatar: AVATAR1_BIG,
    username: 'user1<br/>🥇',
    timeToReview: '[**34m**](https://app.flowwer.dev/charts/review-time/1)<br/>▀▀',
    totalReviews: '**4**<br/>▀▀▀▀▀▀▀▀',
    totalComments: '1<br/>▀▀',
    totalReviewsPerPrs: '4/5 (80%)<br/>▀▀▀▀▀▀▀▀',
  },
  {
    avatar: AVATAR2_BIG,
    username: 'user2<br/>🥈',
    timeToReview: '[2h 21m](https://app.flowwer.dev/charts/review-time/2)<br/>▀▀▀▀▀▀▀▀',
    totalReviews: '1<br/>▀▀',
    totalComments: '**5**<br/>▀▀▀▀▀▀▀▀',
    totalReviewsPerPrs: '1/5 (20%)<br/>▀▀',
  },
];
const REVIEW_PER_PR_NO_LINKS_RESPONSE = [
  TITLES_WITH_REVIEW_PER_PR,
  {
    avatar: AVATAR1_BIG,
    username: 'user1<br/>🥇',
    timeToReview: '**34m**<br/>▀▀',
    totalReviews: '**4**<br/>▀▀▀▀▀▀▀▀',
    totalComments: '1<br/>▀▀',
    totalReviewsPerPrs: '4/5 (80%)<br/>▀▀▀▀▀▀▀▀',
  },
  {
    avatar: AVATAR2_BIG,
    username: 'user2<br/>🥈',
    timeToReview: '2h 21m<br/>▀▀▀▀▀▀▀▀',
    totalReviews: '1<br/>▀▀',
    totalComments: '**5**<br/>▀▀▀▀▀▀▀▀',
    totalReviewsPerPrs: '1/5 (20%)<br/>▀▀',
  },
];

describe('Interactors | .buildTable | .getTableData', () => {
  describe('when sending reviewers only', () => {
    it('returns the default case data', () => {
      const response = getTableData({ reviewers });
      expect(response).toEqual(SIMPLE_RESPONSE);
    });
  });

  describe('when sending bests and display charts', () => {
    it('returns the data with charts and medals', () => {
      const response = getTableData({ bests, reviewers, displayCharts: true });
      expect(response).toEqual(CHARTS_RESPONSE);
    });
  });

  describe('when disabling links', () => {
    it('returns the data without external links', () => {
      const response = getTableData({ reviewers, disableLinks: true });
      expect(response).toEqual(NO_LINKS_RESPONSE);
    });
  });

  describe('when disabling links but adding charts', () => {
    it('returns the data without external links', () => {
      const response = getTableData({
        bests, reviewers, displayCharts: true, disableLinks: true,
      });
      expect(response).toEqual(CHARTS_NO_LINKS_RESPONSE);
    });
  });
  describe('when enabling review percentage', () => {
    it('returns the data with charts, links', () => {
      const response = getTableData({
        bests,
        reviewers,
        displayCharts: true,
        disableLinks: false,
        displayTotalReviewsPerPrs: true,
      });
      expect(response).toEqual(REVIEW_PER_PR_RESPONSE);
    });
    it('returns the data with charts, but no links', () => {
      const response = getTableData({
        bests,
        reviewers,
        displayCharts: true,
        disableLinks: true,
        displayTotalReviewsPerPrs: true,
      });
      expect(response).toEqual(REVIEW_PER_PR_NO_LINKS_RESPONSE);
    });
  });
});
