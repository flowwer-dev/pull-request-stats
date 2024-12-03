const { t } = require('../../../i18n');
const { table } = require('../../../../tests/mocks');
const getMarkdownContent = require('../getMarkdownContent');

const HEADERS = [
  '',
  t('table.columns.username'),
  t('table.columns.totalReviews'),
  t('table.columns.timeToReview'),
  t('table.columns.totalComments'),
  t('table.columns.commentsPerReview'),
  t('table.columns.openedPullRequests'),
];

const AVATAR1_SM = '<a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/user1" width="20"></a>';
const AVATAR1_LG = '<a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/user1" width="32"></a>';

const ROW1_SIMPLE = [
  AVATAR1_LG,
  'user1<br/>🥇',
  '**4**<br/>▀▀▀▀▀▀▀▀',
  '[34m](https://app.flowwer.dev/charts/review-time/1)<br/>▀▀',
  '1<br/>▀▀',
  '0.25<br/>',
  '7<br/>▀▀',
];

const ROW1_NO_CHARTS = [
  AVATAR1_SM,
  'user1',
  '**4**',
  '[34m](https://app.flowwer.dev/charts/review-time/1)',
  '1',
  '0.25',
  '7',
];

describe('Interactors | .buildMarkdown | .getMarkdownContent', () => {
  it('returns the default case data', () => {
    const response = getMarkdownContent({ table });
    expect(response.length).toEqual(table.rows.length + 1);
    expect(response[0]).toEqual(HEADERS);
    expect(response[1]).toEqual(ROW1_SIMPLE);
  });

  it('sets a small avatar size when there a no charts', () => {
    const tableCopy = { ...table };
    tableCopy.rows[0].user.emoji = null;

    const response = getMarkdownContent({ table: tableCopy });
    expect(response[1][0]).toEqual(AVATAR1_SM);
    expect(response[1][1]).toEqual('user1');
  });

  it('does not add a character chart when stats have no chart value', () => {
    const tableCopy = { ...table };
    tableCopy.rows[0].user.emoji = null;
    tableCopy.rows[0].stats = tableCopy.rows[0].stats
      .map((stat) => ({ ...stat, chartValue: null }));

    const response = getMarkdownContent({ table: tableCopy });
    expect(response[1]).toEqual(ROW1_NO_CHARTS);
  });
});
