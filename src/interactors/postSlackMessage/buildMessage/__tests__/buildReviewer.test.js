const { t } = require('../../../../i18n');
const buildReviewer = require('../buildReviewer');
const reviewers = require('../../../__tests__/mocks/populatedReviewers.json');

const [reviewer] = reviewers;
const defaultParams = {
  t,
  reviewer,
  index: 0,
  disableLinks: true,
  displayCharts: false,
};

const DIVIDER = {
  type: 'divider',
};

const USERNAME = {
  type: 'context',
  elements: [
    {
      type: 'image',
      image_url: 'https://avatars.githubusercontent.com/u/1234',
      alt_text: 'user1',
    },
    {
      emoji: true,
      type: 'plain_text',
      text: 'user1',
    },
  ],
};

const STATS = {
  type: 'section',
  fields: [
    {
      type: 'mrkdwn',
      text: `*${t('table.columns.totalReviews')}:* 4`,
    },
    {
      type: 'mrkdwn',
      text: `*${t('table.columns.totalComments')}:* 1`,
    },
    {
      type: 'mrkdwn',
      text: `*${t('table.columns.timeToReview')}:* 34m`,
    },
  ],
};

describe('Interactors | postSlackMessage | .buildReviewer', () => {
  describe('simplest case', () => {
    it('builds a reviewers with basic config', () => {
      const response = buildReviewer({ ...defaultParams });
      expect(response).toEqual([
        USERNAME,
        STATS,
        DIVIDER,
      ]);
    });
  });

  describe('requiring charts', () => {
    it('adds a medal to username section', () => {
      const response = buildReviewer({ ...defaultParams, displayCharts: true });
      expect(response).toEqual([
        {
          ...USERNAME,
          elements: [
            USERNAME.elements[0],
            {
              emoji: true,
              type: 'plain_text',
              text: 'user1 :first_place_medal:',
            },
          ],
        },
        STATS,
        DIVIDER,
      ]);
    });
  });

  describe('requiring links', () => {
    it('adds a medal to username section', () => {
      const response = buildReviewer({ ...defaultParams, disableLinks: false });
      expect(response).toEqual([
        USERNAME,
        {
          ...STATS,
          fields: [
            STATS.fields[0],
            STATS.fields[1],
            {
              type: 'mrkdwn',
              text: `*${t('table.columns.timeToReview')}:* <https://app.flowwer.dev/charts/review-time/1|34m>`,
            },
          ],
        },
        DIVIDER,
      ]);
    });
  });
});
