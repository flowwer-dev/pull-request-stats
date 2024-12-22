const { pullRequests: input } = require('../../../../tests/mocks');
const groupPullRequests = require('../groupPullRequests');

const getPRsByUserId = (data, userId) => {
  const { pullRequests } = data.find((review) => review.userId === userId);
  return pullRequests.map(({ id }) => id);
};

describe('Interactors | getPullRequestStats | .groupPullRequests', () => {
  it('groups pull requests by author', () => {
    const result = groupPullRequests(input);
    expect(result.length).toEqual(2);
    const userIds = result.map((pr) => pr.userId);
    expect(userIds).toContain('1031639', '2009676');
    expect(getPRsByUserId(result, '1031639')).toEqual([12345]);
    expect(getPRsByUserId(result, '2009676').sort()).toEqual([56789].sort());
  });

  it('keeps only the required properties', () => {
    const result = groupPullRequests(input);
    result.forEach(({ pullRequests }) => pullRequests.forEach((pullRequest) => {
      expect(pullRequest).toHaveProperty('id');
      expect(pullRequest).toHaveProperty('reviews');
      expect(pullRequest).toHaveProperty('publishedAt');
    }));
  });
});
