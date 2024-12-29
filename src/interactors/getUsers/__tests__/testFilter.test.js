const testFilter = require('../testFilter');

describe('Interactors | getUsers | .testFilter', () => {
  const reviewers = [
    'manuelmhtr',
    'jartmez',
    'bot1',
    'bot2',
  ];

  it('filters out reviewers by a list of usernames', () => {
    const filter = ['manuelmhtr', 'jartmez'];
    const results = reviewers.filter((reviewer) => testFilter(filter, reviewer));
    expect(results.length).toEqual(2);
    expect(results).toEqual([
      'manuelmhtr',
      'jartmez',
    ]);
  });

  it('filters out reviewers by a regular expression', () => {
    const filter = /bot/;
    const results = reviewers.filter((reviewer) => testFilter(filter, reviewer));
    expect(results.length).toEqual(2);
    expect(results).toEqual([
      'bot1',
      'bot2',
    ]);
  });
});
