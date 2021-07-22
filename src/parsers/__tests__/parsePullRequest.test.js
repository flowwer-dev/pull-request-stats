const input = require('./mocks/pullRequest.json');
const parsePullRequest = require('../parsePullRequest');

describe('Parsers | .parsePullRequest', () => {
  it('parses the main fields of the pull request', () => {
    const response = parsePullRequest(input);

    expect(response).toHaveProperty('id', 12345);
    expect(response).toHaveProperty('cursor', 'Y3Vyc29yOjQ=');
    expect(response).toHaveProperty('publishedAt', new Date('2021-02-12T23:54:38Z'));
    expect(response).toHaveProperty('author', {
      id: '1031639',
      url: 'https://github.com/manuelmhtr',
      login: 'manuelmhtr',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4',
    });
    expect(response).toHaveProperty('reviews');
    expect(response.reviews).toHaveLength(2);
  });
});
