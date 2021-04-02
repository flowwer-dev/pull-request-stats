const getPullRequest = require('../getPullRequest');
const { fetchPullRequestById } = require('../../fetchers');

jest.mock('../../fetchers', () => ({ fetchPullRequestById: jest.fn() }));

const RESPONSE = {
  node: {
    id: '1234',
    body: '# MARKDOWN BODY'
  },
};

describe('Interactors | .getPullRequest', () => {
  fetchPullRequestById.mockImplementation(() => Promise.resolve(RESPONSE));

  beforeEach(jest.clearAllMocks);

  const octokit = 'OCTOKIT';
  const expected = {
    id: '1234',
    body: '# MARKDOWN BODY'
  };

  it('returns a parsed pull request', async () => {
    const pullRequestId = '1234';
    const response = await getPullRequest({ octokit, pullRequestId });
    expect(response).toEqual(expected);
    expect(fetchPullRequestById).toBeCalledTimes(1);
    expect(fetchPullRequestById).toHaveBeenLastCalledWith(octokit, pullRequestId);
  });
});
