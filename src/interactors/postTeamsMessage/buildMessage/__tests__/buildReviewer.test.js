const buildReviewer = require('../buildReviewer');
const reviewers = require('../../../__tests__/mocks/populatedReviewers.json');

const [reviewer] = reviewers;
const defaultParams = {
  reviewer,
  index: 0,
  disableLinks: true,
  displayCharts: false,
};

const extractData = (response) => {
  const [usernameCol, ...statsCols] = response?.columns || [];
  const [imageCol, nameCol] = usernameCol?.items?.[0].columns || [];
  const stats = statsCols.map((col) => col?.items?.[0].text);

  return {
    avatarUrl: imageCol?.items?.[0]?.url,
    login: nameCol?.items?.[0]?.text,
    stats: {
      timeToReview: stats[0],
      totalReviews: stats[1],
      totalComments: stats[2],
    },
  };
};

describe('Interactors | postTeamsMessage | .buildReviewer', () => {
  const expectedContent = {
    avatarUrl: 'https://avatars.githubusercontent.com/u/1234',
    login: 'user1',
    stats: {
      timeToReview: '34m',
      totalReviews: 4,
      totalComments: 1,
    },
  };

  describe('simplest case', () => {
    it('builds a reviewers with basic config', () => {
      const response = buildReviewer({ ...defaultParams });
      expect(extractData(response)).toEqual(expectedContent);
    });
  });

  describe('requiring charts', () => {
    it('adds a medal to username section', () => {
      const response = buildReviewer({ ...defaultParams, displayCharts: true });
      expect(extractData(response)).toEqual({
        ...expectedContent,
        login: 'user1 🥇',
      });
    });
  });

  describe('requiring links', () => {
    it('adds a medal to username section', () => {
      const response = buildReviewer({ ...defaultParams, disableLinks: false });
      expect(extractData(response)).toEqual({
        ...expectedContent,
        stats: {
          ...expectedContent.stats,
          timeToReview: '[34m](https://app.flowwer.dev/charts/review-time/1)',
        },
      });
    });
  });
});
