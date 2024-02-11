const parseExclude = require('../parseExclude');

describe('Interactors | getReviewers | .parseExclude', () => {
  it('returns an empty array when the input does not contain usernames or regexp', () => {
    expect(parseExclude()).toEqual([]);
    expect(parseExclude(null)).toEqual([]);
    expect(parseExclude('')).toEqual([]);
    expect(parseExclude('@')).toEqual([]);
    expect(parseExclude('/@/%^')).toEqual([]);
  });

  it('splits usernames into an array', () => {
    expect(parseExclude('user1,user2')).toEqual(['user1', 'user2']);
  });

  it('removes spaces and converts usernames to lowercase', () => {
    expect(parseExclude('User1, USER2')).toEqual(['user1', 'user2']);
  });

  it('removes invalid characters from usernames', () => {
    expect(parseExclude('@user1, @user%2ñ, keep-dashes-ok')).toEqual(['user1', 'user2', 'keep-dashes-ok']);
  });

  it('parses regexp strings', () => {
    expect(parseExclude('/user[0-9]/')).toEqual(/user[0-9]/);
    expect(parseExclude('/^bot-.*/ig')).toEqual(/^bot-.*/ig);
  });
});
