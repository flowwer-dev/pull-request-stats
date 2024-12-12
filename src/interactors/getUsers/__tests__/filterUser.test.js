const filterUser = require('../filterUser');

describe('Interactors | getUsers | .filterUser', () => {
  const reviewers = [
    'manuelmhtr',
    'jartmez',
    'bot1',
    'bot2',
  ];

  it('filters out reviewers by a list of usernames', () => {
    const exclude = ['manuelmhtr', 'jartmez'];
    const results = reviewers.filter((reviewer) => filterUser(exclude, reviewer));
    expect(results.length).toEqual(2);
    expect(results).toEqual([
      'bot1',
      'bot2',
    ]);
  });

  it('filters out reviewers by a regular expression', () => {
    const exclude = /bot/;
    const results = reviewers.filter((reviewer) => filterUser(exclude, reviewer));
    expect(results.length).toEqual(2);
    expect(results).toEqual([
      'manuelmhtr',
      'jartmez',
    ]);
  });

  it('removes the empty users', () => {
    const exclude = /bot/;
    const results = ['user1', '', null, undefined].filter((reviewer) => filterUser(exclude, reviewer));
    expect(results.length).toEqual(1);
    expect(results).toEqual([
      'user1',
    ]);
  });
});
