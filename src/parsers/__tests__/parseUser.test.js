const input = require('./mocks/user.json');
const parseUser = require('../parseUser');

describe('Parsers | .parseUser', () => {
  it('parses the main fields of a user', () => {
    const response = parseUser(input);
    expect(response).toHaveProperty('id', '1031639');
    expect(response).toHaveProperty('url', 'https://github.com/manuelmhtr');
    expect(response).toHaveProperty('login', 'manuelmhtr');
    expect(response).toHaveProperty('avatarUrl', 'https://avatars.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4');
  });
});
