const { pullRequests: input } = require('../../../../tests/mocks');
const getUsers = require('../index');

const getLogins = (users) => users.map(({ login }) => login);

describe('Interactors | getUsers', () => {
  it('groups reviews by author and calculate its stats', () => {
    const result = getUsers(input);
    expect(result.length).toEqual(3);
    expect(getLogins(result)).toContain('manuelmhtr', 'jartmez', 'javierbyte');
  });

  it('excludes reviewers when the option is passed', () => {
    const result = getUsers(input, { excludeStr: 'manuelmhtr' });
    expect(result.length).toEqual(2);
    expect(getLogins(result)).not.toContain('manuelmhtr');
  });

  it('includes reviewers when the option is passed', () => {
    const result = getUsers(input, { includeStr: 'manuelmhtr' });
    expect(result.length).toEqual(1);
    expect(getLogins(result)).toContain('manuelmhtr');
  });

  it('removes the empty usernames', () => {
    const emptyAuthor = { id: '1', login: '' };
    const emptyInput = { author: emptyAuthor, reviews: [] };
    const result = getUsers([emptyInput]);
    expect(result.length).toEqual(0);
  });

  it('excludes users even if they have uppercase letters', () => {
    const author = { id: '1', login: 'UPPERCASE' };
    const customInput = { author, reviews: [] };
    const result = getUsers([customInput], { excludeStr: 'uppercase' });
    expect(result.length).toEqual(0);
  });

  it('includes users even if they have uppercase letters', () => {
    const author = { id: '1', login: 'UPPERCASE' };
    const customInput = { author, reviews: [] };
    const result = getUsers([customInput], { includeStr: 'uppercase' });
    expect(result.length).toEqual(1);
  });
});
