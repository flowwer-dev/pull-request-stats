const parser = require('../parser');

const input = {
  node: {
    id: 'PR_kwDODiVEWs455SUz',
    url: 'https://github.com/zenfi/api/pull/493',
    number: 493,
    comments: {
      nodes: [
        {
          author: {
            login: 'user1',
          },
          body: 'body1',
        },
        {
          author: {
            login: 'user2',
          },
          body: 'body2',
        },
      ],
    },
  },
};

const expectedOutput = {
  id: 'PR_kwDODiVEWs455SUz',
  url: 'https://github.com/zenfi/api/pull/493',
  number: 493,
  comments: [
    {
      author: {
        login: 'user1',
      },
      body: 'body1',
    },
    {
      author: {
        login: 'user2',
      },
      body: 'body2',
    },
  ],
};

describe('Fetchers | .fetchPullRequestById | .parser', () => {
  it('parses the pull request data', () => {
    const result = parser(input);
    expect(result).toEqual(expectedOutput);
  });
});
