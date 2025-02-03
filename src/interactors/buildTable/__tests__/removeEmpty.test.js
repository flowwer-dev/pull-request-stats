const { entries } = require('../../../../tests/mocks');
const removeEmpty = require('../removeEmpty');

describe('Interactors | .buildTable | .removeEmpty', () => {
  const mainStats = ['timeToReview', 'totalReviews', 'totalComments'];

  it('keeps all the entry when no stats are empty', () => {
    const response = removeEmpty(entries, mainStats);
    expect(response).toHaveLength(entries.length);
    expect(response).toMatchObject(entries);
  });

  it('removes the entries if they have no requested stats', () => {
    const input = entries.map((entry) => ({
      ...entry,
      stats: {
        ...entry.stats,
        timeToReview: null,
        totalReviews: null,
        totalComments: null,
      },
    }));
    const response = removeEmpty(input, mainStats);
    expect(response).toEqual([]);
  });

  it('keeps the entries if they have some requested stats', () => {
    const input = entries.map((entry) => ({
      ...entry,
      stats: {
        ...entry.stats,
        totalComments: 0,
      },
    }));
    const response = removeEmpty(input, mainStats);
    expect(response).toHaveLength(entries.length);
    expect(response).toMatchObject(input);
  });

  it('removes all if no stats are requested', () => {
    const response = removeEmpty(entries, []);
    expect(response).toEqual([]);
  });
});
