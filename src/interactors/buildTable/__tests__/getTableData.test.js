const { t } = require('../../../i18n');
const { entries } = require('../../../../tests/mocks');
const { STATS, VALID_STATS } = require('../../../config/stats');
const getTableData = require('../getTableData');

const bests = {
  totalReviews: 4,
  totalComments: 5,
  commentsPerReview: 5,
  openedPullRequests: 30,
  timeToReview: 1_000_000,
};

describe('Interactors | .buildTable | .getTableData', () => {
  const defaultParams = {
    bests,
    entries,
    mainStats: VALID_STATS,
    disableLinks: true,
    displayCharts: false,
  };

  it('builds the headers successfully', () => {
    const response = getTableData(defaultParams);
    expect(response.headers[0]).toEqual({ text: t('table.columns.username') });
    VALID_STATS.forEach((statName, index) => {
      expect(response.headers[index + 1]).toEqual({ text: t(`table.columns.${statName}`) });
    });
  });

  it('builds the users correctly', () => {
    const response = getTableData(defaultParams);
    response.rows.forEach((row, index) => {
      expect(row.user).toEqual({
        link: entries[index].user.url,
        image: entries[index].user.avatarUrl,
        text: entries[index].user.login,
        emoji: null,
      });
    });
  });

  it('builds the stats successfully', () => {
    const response = getTableData(defaultParams);
    response.rows.forEach((row) => {
      row.stats.forEach((stat) => {
        expect(stat).toEqual({
          text: expect.any(String),
          bold: expect.any(Boolean),
          link: null,
          chartValue: null,
        });
      });
    });
  });

  it('displays only the requested stats', () => {
    const testCases = [
      VALID_STATS,
      [VALID_STATS[0]],
      [VALID_STATS[VALID_STATS.length - 1], VALID_STATS[0]],
    ];

    testCases.forEach((mainStats) => {
      const response = getTableData({ ...defaultParams, mainStats });
      expect(response.headers.length).toEqual(mainStats.length + 1);
      response.rows.forEach((row) => {
        expect(row.stats.length).toEqual(mainStats.length);
      });
    });
  });

  it('adds the stats link when required', () => {
    const response = getTableData({
      ...defaultParams,
      disableLinks: false,
    });

    response.rows.forEach((row, index) => {
      VALID_STATS.forEach((statName, statIndex) => {
        const link = entries[index].urls[statName] || null;
        expect(row.stats[statIndex].link).toEqual(link);
      });
    });
  });

  it('adds the bold option to the best stats', () => {
    const mainStats = [STATS.totalReviews.id];
    const response = getTableData({
      ...defaultParams,
      mainStats,
    });

    expect(response.rows[0].stats[0].bold).toEqual(true);
    expect(response.rows[1].stats[0].bold).toEqual(false);
    expect(response.rows[2].stats[0].bold).toEqual(false);
  });

  it('adds the chart value when required', () => {
    const mainStats = [STATS.totalReviews.id];
    const response = getTableData({
      ...defaultParams,
      mainStats,
      displayCharts: true,
    });

    response.rows.forEach((row, index) => {
      mainStats.forEach((statName, statIndex) => {
        const chartValue = entries[index].contributions[statName];
        expect(row.stats[statIndex].chartValue).toEqual(chartValue);
      });
    });
  });

  it('adds the emoji when required', () => {
    const displayCharts = true;
    const response = getTableData({
      ...defaultParams,
      displayCharts,
    });

    expect(response.rows[0].user.emoji).toEqual('medal1');
    expect(response.rows[1].user.emoji).toEqual('medal2');
    expect(response.rows[2].user.emoji).toEqual('medal3');
  });

  it('parses the stat text correctly', () => {
    const mainStats = [STATS.timeToReview.id];
    const response = getTableData({
      ...defaultParams,
      mainStats,
    });
    response.rows.forEach((row, index) => {
      const value = entries[index].stats.timeToReview;
      const text = STATS.timeToReview.parser(value);
      expect(row.stats[0].text).toEqual(text);
    });
  });
});
