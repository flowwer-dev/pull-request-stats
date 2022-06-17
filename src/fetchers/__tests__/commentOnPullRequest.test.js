const commentOnPullRequest = require('../commentOnPullRequest');

describe('Fetchers | .commentOnPullRequest', () => {
  const graphql = jest.fn(() => Promise.resolve());
  const octokit = { graphql };

  beforeEach(() => {
    graphql.mockClear();
  });

  it('builds the query and fetches data from Github API', async () => {
    const body = 'Test comment';
    const pullRequestId = '123';
    await commentOnPullRequest({ octokit, body, pullRequestId });
    expect(graphql).toHaveBeenCalledTimes(1);
    expect(graphql).toHaveBeenCalledWith(
      expect.stringContaining('addComment(input: $input)'),
      {
        input: {
          body,
          subjectId: pullRequestId,
        },
      },
    );
  });
});
