const { pullRequests: input } = require('../../../../tests/mocks');
const groupPullRequests = require('../groupPullRequests');

const getPRsByAuthorId = (data, authorId) => {
  const { pullRequests } = data.find((review) => review.authorId === authorId);
  return pullRequests.map(({ id }) => id);
};

describe('Interactors | getPullRequestStats | .groupPullRequests', () => {
  it('groups pull requests by author', () => {
    const result = groupPullRequests(input);
    expect(result.length).toEqual(2);
    const authorIds = result.map((pr) => pr.authorId);
    expect(authorIds).toContain('1031639', '2009676');
    expect(getPRsByAuthorId(result, '1031639')).toEqual([12345]);
    expect(getPRsByAuthorId(result, '2009676').sort()).toEqual([12346].sort());
  });

  it('keeps only the required properties', () => {
    const result = groupPullRequests(input);
    result.forEach(({ pullRequests }) => pullRequests.forEach((pullRequest) => {
      expect(pullRequest).toHaveProperty('id');
      expect(pullRequest).toHaveProperty('submittedAt');
      expect(pullRequest).not.toHaveProperty('cursor');
      expect(pullRequest).not.toHaveProperty('reviews');
    }));
  });
});
