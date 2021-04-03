const input = require('./mocks/review.json');
const parseReview = require('../parseReview');

describe('Parsers | .parseReview', () => {
  const submittedAt = new Date('2021-02-12T23:55:22Z');
  const pullRequest = { authorLogin: 'javierbyte', publishedAt: new Date('2021-02-12T23:54:38Z') };

  it('parses the main fields', () => {
    const response = parseReview(input, pullRequest);
    expect(response).toHaveProperty('id', 5678);
    expect(response).toHaveProperty('submittedAt', submittedAt);
    expect(response).toHaveProperty('commentsCount', 1);
    expect(response).toHaveProperty('author', {
      id: '1031639',
      url: 'https://github.com/manuelmhtr',
      login: 'manuelmhtr',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4',
    });
  });

  describe('isOwnPull', () => {
    it('returns false when the pull request author is different', () => {
      const response = parseReview(input, pullRequest);
      expect(response).toHaveProperty('isOwnPull', false);
    });

    it('returns true when the pull request author is the same', () => {
      const response = parseReview(input, { ...pullRequest, authorLogin: 'manuelmhtr' });
      expect(response).toHaveProperty('isOwnPull', true);
    });
  });

  describe('timeToReview', () => {
    const pushedAt = new Date('2021-02-12T23:53:13Z');

    it('compares vs the pull request submittedAt when the date is after the commit pushedAt', () => {
      const response = parseReview(input, pullRequest);
      expect(response).toHaveProperty('timeToReview', submittedAt - pullRequest.publishedAt);
    });

    it('compares vs the commit pushedAt when the date is after the pull request submittedAt', () => {
      const response = parseReview(input, { ...pullRequest, publishedAt: new Date(0) });
      expect(response).toHaveProperty('timeToReview', submittedAt - pushedAt);
    });
  });
});
