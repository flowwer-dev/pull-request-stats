const postComment = require('../postComment');
const { updatePullRequest, commentOnPullRequest } = require('../../fetchers');

jest.mock('../../fetchers', () => ({
  updatePullRequest: jest.fn(),
  commentOnPullRequest: jest.fn(),
}));

describe('Interactors | .postComment', () => {
  beforeEach(jest.clearAllMocks);

  const octokit = 'OCTOKIT';
  const pullRequestId = '1234';
  const content = '# MARKDOWN BODY';
  const baseParams = {
    octokit,
    pullRequestId,
    content,
    currentBody: null,
    publishAs: null,
  };

  it('calls updatePullRequest when publishAs is "DESCRIPTION"', async () => {
    const publishAs = 'DESCRIPTION';
    await postComment({ ...baseParams, publishAs });
    expect(commentOnPullRequest).not.toBeCalled();
    expect(updatePullRequest).toBeCalledTimes(1);
    expect(updatePullRequest).toBeCalledWith({
      octokit,
      id: pullRequestId,
      body: content,
    });
  });

  it('calls commentOnPullRequest when publishAs is any other value', async () => {
    const publishAs = 'COMMENT';
    await postComment({ ...baseParams, publishAs });
    expect(updatePullRequest).not.toBeCalled();
    expect(commentOnPullRequest).toBeCalledTimes(1);
    expect(commentOnPullRequest).toBeCalledWith({
      octokit,
      pullRequestId,
      body: content,
    });
  });

  it('does nothing when publishAs is "NONE"', async () => {
    const publishAs = 'NONE';
    await postComment({ ...baseParams, publishAs });
    expect(commentOnPullRequest).not.toBeCalled();
    expect(updatePullRequest).not.toBeCalled();
  });
});
