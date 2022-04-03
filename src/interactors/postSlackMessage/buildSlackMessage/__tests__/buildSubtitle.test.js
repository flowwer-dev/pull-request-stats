const { t } = require('../../../../i18n');
const buildSubtitle = require('../buildSubtitle');

const periodLength = 10;
const pullRequest = {
  number: 13,
  url: 'https://github.com/manuelmhtr/pulls/13',
};

describe('Interactors | postSlackMessage | .buildSubtitle', () => {
  describe('when sending a pull request', () => {
    it('returns a subtitle with no pull request data', () => {
      const response = buildSubtitle({ t, periodLength, pullRequest });
      const prLink = `(<${pullRequest.url}|#${pullRequest.number}>)`;
      expect(response).toEqual([
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${t('table.subtitle', { count: periodLength })} ${prLink}`,
          },
        },
        {
          type: 'divider',
        },
      ]);
    });
  });

  describe('when not sending a pull request', () => {
    it('returns a subtitle with no pull request data', () => {
      const response = buildSubtitle({ t, periodLength });
      expect(response).toEqual([
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${t('table.subtitle', { count: periodLength })}`,
          },
        },
        {
          type: 'divider',
        },
      ]);
    });
  });
});
