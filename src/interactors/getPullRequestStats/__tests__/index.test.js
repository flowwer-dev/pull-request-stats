const { pullRequests: input } = require('../../../../tests/mocks');
const getPullRequestStats = require('../index');

const getAuthorIds = (reviewers) => reviewers.map((r) => r.authorId);

describe('Interactors | getPullRequestStats', () => {
  it('groups pull requests by author and calculate its stats', () => {
    const result = getPullRequestStats(input);
    expect(result.length).toEqual(2);
    expect(getAuthorIds(result)).toContain('1031639', '8755542');

    result.forEach((author) => {
      expect(author).toHaveProperty('authorId');

      expect(author).toHaveProperty('stats');
      expect(author.stats).toHaveProperty('openedPullRequests');
    });
  });
});
