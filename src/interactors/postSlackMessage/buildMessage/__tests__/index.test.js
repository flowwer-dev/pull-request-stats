const { table } = require('../../../../../tests/mocks');
const buildMessage = require('../index');
const buildSubtitle = require('../buildSubtitle');
const buildRow = require('../buildRow');

const SUBTITLE = 'SUBTITLE';
const ROW = 'ROW';
const statNames = table.headers.slice(1).map(({ text }) => text);

jest.mock('../buildSubtitle', () => jest.fn(() => [SUBTITLE]));
jest.mock('../buildRow', () => jest.fn(() => [ROW]));

const defaultOptions = {
  table,
  org: 'ORG',
  repos: 'REPOS',
  pullRequest: 'PULL REQUEST',
  periodLength: 'PERIOD LENGTH',
};

describe('Interactors | postSlackMessage | .buildMessage', () => {
  beforeEach(() => {
    buildSubtitle.mockClear();
    buildRow.mockClear();
  });

  it('returns the expected structure', () => {
    const tableCopy = { ...table };
    tableCopy.rows = [tableCopy.rows[0]];

    const response = buildMessage({ ...defaultOptions, table: tableCopy });
    expect(response).toEqual({
      blocks: [
        SUBTITLE,
        ROW,
      ],
    });
  });

  it('calls builders with the correct parameters', () => {
    buildMessage({ ...defaultOptions });
    expect(buildSubtitle).toHaveBeenCalledWith({
      t: expect.anything(),
      org: defaultOptions.org,
      repos: defaultOptions.repos,
      pullRequest: defaultOptions.pullRequest,
      periodLength: defaultOptions.periodLength,
    });
    expect(buildRow).toHaveBeenCalledWith({
      row: table.rows[0],
      statNames,
    });
  });

  it('builds a row per each passed', () => {
    buildMessage(defaultOptions);
    expect(buildRow).toHaveBeenCalledTimes(table.rows.length);
  });
});
