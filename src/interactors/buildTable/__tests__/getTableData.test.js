const reviewers = require('./mocks/populatedReviewers.json');
const getTableData = require('../getTableData');

const bests = {
  totalReviews: 4,
  totalComments: 5,
  commentsPerReview: 5,
  timeToReview: 2052500,
};

const HEADERS = [
  "",
  "User",
  "Avg. time to first review",
  "Total pull reviews",
  "Total comments"
];

const AVATAR1 = '<a href=https://github.com/user1><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a>';
const AVATAR2 = '<a href=https://github.com/user2><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a>';
const AVATAR1_BIG = '<a href=https://github.com/user1><img src="https://avatars.githubusercontent.com/u/1234" width="32"></a>';
const AVATAR2_BIG = '<a href=https://github.com/user2><img src="https://avatars.githubusercontent.com/u/5678" width="32"></a>';

const SIMPLE_RESPONSE = [
  HEADERS,
  [
    AVATAR1,
    "user1",
    "[34m](https://app.flowwer.dev/charts/review-time/1)",
    "4",
    "1"
  ],
  [
    AVATAR2,
    "user2",
    "[2h 21m](https://app.flowwer.dev/charts/review-time/2)",
    "1",
    "5"
  ]
];

const CHARTS_RESPONSE = [
  HEADERS,
  [
    AVATAR1_BIG,
    "user1<br/>🥇",
    "[**34m**](https://app.flowwer.dev/charts/review-time/1)<br/>▀▀",
    "**4**<br/>▀▀▀▀▀▀▀▀",
    "1<br/>▀▀"
  ],
  [
    AVATAR2_BIG,
    "user2<br/>🥈",
    "[2h 21m](https://app.flowwer.dev/charts/review-time/2)<br/>▀▀▀▀▀▀▀▀",
    "1<br/>▀▀",
    "**5**<br/>▀▀▀▀▀▀▀▀"
  ]
];

const NO_LINKS_RESPONSE = [
  HEADERS,
  [
    AVATAR1,
    "user1",
    "34m",
    "4",
    "1"
  ],
  [
    AVATAR2,
    "user2",
    "2h 21m",
    "1",
    "5"
  ]
];

const CHARTS_NO_LINKS_RESPONSE = [
  HEADERS,
  [
    AVATAR1_BIG,
    "user1<br/>🥇",
    "**34m**<br/>▀▀",
    "**4**<br/>▀▀▀▀▀▀▀▀",
    "1<br/>▀▀"
  ],
  [
    AVATAR2_BIG,
    "user2<br/>🥈",
    "2h 21m<br/>▀▀▀▀▀▀▀▀",
    "1<br/>▀▀",
    "**5**<br/>▀▀▀▀▀▀▀▀"
  ]
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
      const response = getTableData({ bests, reviewers, displayCharts: true, disableLinks: true });
      expect(response).toEqual(CHARTS_NO_LINKS_RESPONSE);
    });
  });
});
