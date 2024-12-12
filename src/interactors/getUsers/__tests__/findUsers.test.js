const { pullRequests: input } = require('../../../../tests/mocks');
const findUsers = require('../findUsers');

describe('Interactors | getUsers | .findUsers', () => {
  it('finds all the users as authors or reviewers on the pull request', () => {
    const result = findUsers(input);
    expect(result).toEqual(expect.arrayContaining([
      {
        id: '1031639',
        url: 'https://github.com/manuelmhtr',
        login: 'manuelmhtr',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4',
      },
      {
        id: '8755542',
        url: 'https://github.com/jartmez',
        login: 'jartmez',
        avatarUrl: 'https://avatars.githubusercontent.com/u/8755542?v=4',
      },
      {
        id: '2009676',
        url: 'https://github.com/javierbyte',
        login: 'javierbyte',
        avatarUrl: 'https://avatars.githubusercontent.com/u/2009676',
      },
    ]));
  });
});
