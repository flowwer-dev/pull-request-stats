const { users, reviewStats, pullRequestStats } = require('../../../tests/mocks');
const fulfillEntries = require('../fulfillEntries');
const getPullRequestStats = require('../getPullRequestStats');
const getReviewStats = require('../getReviewStats');
const getUsers = require('../getUsers');
const mergeStats = require('../mergeStats');
const getEntries = require('../getEntries');

jest.mock('../fulfillEntries', () => jest.fn());
jest.mock('../getPullRequestStats', () => jest.fn());
jest.mock('../getReviewStats', () => jest.fn());
jest.mock('../getUsers', () => jest.fn());
jest.mock('../mergeStats', () => jest.fn());

describe('Interactors | .getEntries', () => {
  const core = { info: jest.fn(), debug: jest.fn() };
  const pulls = ['PULL1', 'PULL2', 'PULL3'];
  const entries = ['ENTRY1', 'ENTRY2', 'ENTRY3'];
  const merged = 'MERGED';
  const params = {
    core,
    pulls,
    excludeStr: 'EXCLUDE',
    periodLength: 'PERIOD_LENGTH',
  };

  getUsers.mockReturnValue(users);
  getPullRequestStats.mockReturnValue(pullRequestStats);
  getReviewStats.mockReturnValue(reviewStats);
  mergeStats.mockReturnValue(merged);
  fulfillEntries.mockReturnValue(entries);

  beforeEach(jest.clearAllMocks);

  it('calls the correct interactors with the expected params', async () => {
    const results = await getEntries(params);
    expect(results).toBe(entries);
    expect(getUsers).toBeCalledWith(pulls, { excludeStr: params.excludeStr });
    expect(getPullRequestStats).toBeCalledWith(pulls);
    expect(getReviewStats).toBeCalledWith(pulls);
    expect(mergeStats).toBeCalledWith({ users, pullRequestStats, reviewStats });
    expect(fulfillEntries).toBeCalledWith(merged, { periodLength: params.periodLength });
    expect(core.info).toHaveBeenCalledTimes(3);
    expect(core.debug).toHaveBeenCalledTimes(3);
  });
});
