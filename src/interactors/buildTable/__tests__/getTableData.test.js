const reviewers = require('./mocks/populatedReviewers.json');
const getTableData = require('../getTableData');

const bests = {
  totalReviews: 4,
  totalComments: 5,
  commentsPerReview: 5,
  timeToReview: 2052500,
};

const TITLES = {
  avatar: '',
  username: 'User',
  timeToReview: 'Median time to review',
  totalReviews: 'Total reviews',
  totalComments: 'Total comments',
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
  },
  {
    avatar: AVATAR2_BIG,
    username: 'user2<br/>🥈',
    timeToReview: '[2h 21m](https://app.flowwer.dev/charts/review-time/2)<br/>▀▀▀▀▀▀▀▀',
    totalReviews: '1<br/>▀▀',
    totalComments: '**5**<br/>▀▀▀▀▀▀▀▀',
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

  describe('when sending limit option', () => {
    it('limits the results', () => {
      const limit = 1;
      const response = getTableData({ reviewers, limit });
      const titles = SIMPLE_RESPONSE[0];
      const resultRows = SIMPLE_RESPONSE.slice(1, 1 + limit);
      expect(response).toEqual([titles, ...resultRows]);
    });
  });
});
