const filterReviewer = require('../filterReviewer');

describe('Interactors | getReviewers | .filterReviewer', () => {
  const reviewers = [
    'manuelmhtr',
    'jartmez',
    'bot1',
    'bot2',
  ];

  it('filters out reviewers by a list of usernames', () => {
    const exclude = ['manuelmhtr', 'jartmez'];
    const results = reviewers.filter((reviewer) => filterReviewer(exclude, reviewer));
    expect(results.length).toEqual(2);
    expect(results).toEqual([
      'bot1',
      'bot2',
    ]);
  });

  it('filters out reviewers by a regular expression', () => {
    const exclude = /bot/;
    const results = reviewers.filter((reviewer) => filterReviewer(exclude, reviewer));
    expect(results.length).toEqual(2);
    expect(results).toEqual([
      'manuelmhtr',
      'jartmez',
    ]);
  });
});
