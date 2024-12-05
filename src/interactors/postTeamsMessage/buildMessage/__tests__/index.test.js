const buildMessage = require('../index');
const buildHeaders = require('../buildHeaders');
const buildSubtitle = require('../buildSubtitle');
const buildRow = require('../buildRow');

const HEADERS = 'HEADERS';
const SUBTITLE = 'SUBTITLE';
const ROW = 'ROW';
const table = {
  headers: [
    { text: 'HEADER 1' },
    { text: 'HEADER 2' },
  ],
  rows: [ROW],
};

jest.mock('../buildHeaders', () => jest.fn(() => HEADERS));
jest.mock('../buildSubtitle', () => jest.fn(() => SUBTITLE));
jest.mock('../buildRow', () => jest.fn(() => ROW));

const defaultOptions = {
  table,
  pullRequest: 'PULL REQUEST',
  periodLength: 'PERIOD LENGTH',
};

describe('Interactors | postTeamsMessage | .buildMessage', () => {
  beforeEach(() => {
    buildHeaders.mockClear();
    buildSubtitle.mockClear();
    buildRow.mockClear();
  });

  it('returns the expected structure', () => {
    const response = buildMessage({ ...defaultOptions });
    expect(response).toEqual([
      SUBTITLE,
      HEADERS,
      ROW,
    ]);
  });

  it('calls builders with the correct parameters', () => {
    buildMessage({ ...defaultOptions });
    expect(buildSubtitle).toHaveBeenCalledWith({
      t: expect.anything(),
      pullRequest: defaultOptions.pullRequest,
      periodLength: defaultOptions.periodLength,
    });
    expect(buildHeaders).toHaveBeenCalledWith(defaultOptions.table.headers);
    expect(buildRow).toHaveBeenCalledWith({
      row: defaultOptions.table.rows[0],
    });
  });

  it('builds a reviewers per each passed', () => {
    const rows = ['ROW 1', 'ROW 2', 'ROW 3'];
    const tableCopy = { ...table, rows };
    buildMessage({ ...defaultOptions, table: tableCopy });
    expect(buildRow).toHaveBeenCalledTimes(rows.length);
  });
});
