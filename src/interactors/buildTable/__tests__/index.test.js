const { entries } = require('../../../../tests/mocks');
const { VALID_STATS } = require('../../../config/stats');
const getTableData = require('../getTableData');
const buildTable = require('../index');

jest.mock('../getTableData', () => jest.fn());

describe('Interactors | .buildTable', () => {
  const defaultParams = {
    entries,
    limit: null,
    sortKey: VALID_STATS[0],
    mainStats: VALID_STATS,
    disableLinks: true,
    displayCharts: false,
  };

  getTableData.mockImplementation(jest.requireActual('../getTableData'));

  beforeEach(() => {
    getTableData.mockClear();
  });

  it('limits the results', () => {
    const response1 = buildTable(defaultParams);
    expect(response1.rows.length).toEqual(entries.length);

    const limit = 1;
    const response2 = buildTable({ ...defaultParams, limit });
    expect(response2.rows.length).toEqual(limit);
  });

  it('sorts data by the given key', () => {
    const response = buildTable(defaultParams);
    expect(response.rows[0].user.text).toEqual('user1');
    expect(response.rows[1].user.text).toEqual('user2');
    expect(response.rows[2].user.text).toEqual('user3');
  });

  it('calls build table data with the correct params', () => {
    buildTable(defaultParams);
    expect(getTableData).toHaveBeenCalledWith(expect.objectContaining({
      entries,
      bests: expect.any(Object),
      mainStats: defaultParams.mainStats,
      disableLinks: defaultParams.disableLinks,
      displayCharts: defaultParams.displayCharts,
    }));
  });
});
