const parseFilter = require('../parseFilter');

describe('Interactors | getUsers | .parseFilter', () => {
  it('returns null when the input does not contain usernames or regexp', () => {
    expect(parseFilter()).toEqual(null);
    expect(parseFilter(null)).toEqual(null);
    expect(parseFilter('')).toEqual(null);
    expect(parseFilter('@')).toEqual(null);
    expect(parseFilter('/@/%^')).toEqual(null);
  });

  it('splits usernames into an array', () => {
    expect(parseFilter('user1,user2')).toEqual(['user1', 'user2']);
  });

  it('removes spaces and converts usernames to lowercase', () => {
    expect(parseFilter('User1, USER2')).toEqual(['user1', 'user2']);
  });

  it('removes invalid characters from usernames', () => {
    expect(parseFilter('@user1, @user%2ñ, keep-dashes-ok')).toEqual(['user1', 'user2', 'keep-dashes-ok']);
  });

  it('parses regexp strings', () => {
    expect(parseFilter('/user[0-9]/')).toEqual(/user[0-9]/);
    expect(parseFilter('/^bot-.*/ig')).toEqual(/^bot-.*/ig);
  });
});
