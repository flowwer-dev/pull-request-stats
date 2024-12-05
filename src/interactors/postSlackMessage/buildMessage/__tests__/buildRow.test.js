const { table } = require('../../../../../tests/mocks');
const buildRow = require('../buildRow');

const [row] = table.rows;
const defaultParams = {
  row,
  statNames: table.headers.slice(1).map(({ text }) => text),
};

const DIVIDER = {
  type: 'divider',
};

const USERNAME = {
  type: 'context',
  elements: [
    {
      type: 'image',
      image_url: 'https://avatars.githubusercontent.com/u/user1',
      alt_text: 'user1',
    },
    {
      emoji: true,
      type: 'plain_text',
      text: 'user1 :first_place_medal:',
    },
  ],
};

const STATS = {
  type: 'section',
  fields: [
    {
      type: 'mrkdwn',
      text: '*Total reviews:* 4',
    },
    {
      type: 'mrkdwn',
      text: '*Time to review:* <https://app.flowwer.dev/charts/review-time/1|34m>',
    },
    {
      type: 'mrkdwn',
      text: '*Total comments:* 1',
    },
    {
      type: 'mrkdwn',
      text: '*Comments per review:* 0.25',
    },
    {
      type: 'mrkdwn',
      text: '*Opened PRs:* 7',
    },
  ],
};

describe('Interactors | postSlackMessage | .buildRow', () => {
  describe('simplest case', () => {
    it('builds a reviewers with basic config', () => {
      const response = buildRow({ ...defaultParams });
      expect(response).toEqual([
        USERNAME,
        STATS,
        DIVIDER,
      ]);
    });
  });

  describe('when the user has no emoji', () => {
    it('adds no medal to the username', () => {
      const rowCopy = { ...row };
      rowCopy.user.emoji = null;
      const response = buildRow({ ...defaultParams, row: rowCopy });
      expect(response).toEqual([
        {
          ...USERNAME,
          elements: [
            USERNAME.elements[0],
            {
              emoji: true,
              type: 'plain_text',
              text: 'user1',
            },
          ],
        },
        STATS,
        DIVIDER,
      ]);
    });
  });
});
