const buildMessage = require('../index');
const buildHeaders = require('../buildHeaders');
const buildSubtitle = require('../buildSubtitle');
const buildReviewer = require('../buildReviewer');

const HEADERS = 'HEADERS';
const SUBTITLE = 'SUBTITLE';
const REVIEWER = 'REVIEWER';

jest.mock('../buildHeaders', () => jest.fn(() => HEADERS));
jest.mock('../buildSubtitle', () => jest.fn(() => SUBTITLE));
jest.mock('../buildReviewer', () => jest.fn(() => REVIEWER));

const defaultOptions = {
  reviewers: ['REVIEWER 1'],
  pullRequest: 'PULL REQUEST',
  periodLength: 'PERIOD LENGTH',
  disableLinks: 'DISABLE LINKS',
  displayCharts: 'DISPLAY CHARTS',
};

describe('Interactors | postTeamsMessage | .buildMessage', () => {
  beforeEach(() => {
    buildHeaders.mockClear();
    buildSubtitle.mockClear();
    buildReviewer.mockClear();
  });

  it('returns the expected structure', () => {
    const response = buildMessage({ ...defaultOptions });
    expect(response).toEqual([
      SUBTITLE,
      HEADERS,
      REVIEWER,
    ]);
  });

  it('calls builders with the correct parameters', () => {
    buildMessage({ ...defaultOptions });
    expect(buildSubtitle).toHaveBeenCalledWith({
      t: expect.anything(),
      pullRequest: defaultOptions.pullRequest,
      periodLength: defaultOptions.periodLength,
    });
    expect(buildHeaders).toHaveBeenCalledWith({
      t: expect.anything(),
    });
    expect(buildReviewer).toHaveBeenCalledWith({
      index: 0,
      reviewer: defaultOptions.reviewers[0],
      disableLinks: defaultOptions.disableLinks,
      displayCharts: defaultOptions.displayCharts,
    });
  });

  it('builds a reviewers per each passed', () => {
    const reviewers = ['REVIEWER 1', 'REVIEWER 2', 'REVIEWER 3'];
    buildMessage({ ...defaultOptions, reviewers });
    expect(buildReviewer).toHaveBeenCalledTimes(reviewers.length);
  });
});
