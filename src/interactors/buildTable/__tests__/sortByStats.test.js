const { entries } = require('../../../../tests/mocks');
const sortByStats = require('../sortByStats');

describe('Interactors | .buildTable | .sortByStats', () => {
  const expectToMatchOrder = (results, expectedOrder) => {
    const actualOrder = results.map((r) => r.user.id);
    expect(actualOrder).toEqual(expectedOrder);
  };

  const getLastUserId = (results) => results[results.length - 1].user.id;

  it('sorts the reviewers by "totalReviews" when sortBy is not specified', () => {
    const sortBy = null;
    const response = sortByStats(entries, sortBy);
    expectToMatchOrder(response, [
      'user1',
      'user2',
      'user3',
    ]);
  });

  it('sorts the entries by "timeToReview"', () => {
    const sortBy = 'timeToReview';
    const response = sortByStats(entries, sortBy);
    expectToMatchOrder(response, [
      'user3',
      'user1',
      'user2',
    ]);
  });

  it('sorts the entries by "totalReviews"', () => {
    const sortBy = 'totalReviews';
    const response = sortByStats(entries, sortBy);
    expectToMatchOrder(response, [
      'user1',
      'user2',
      'user3',
    ]);
  });

  it('sorts the entries by "totalComments"', () => {
    const sortBy = 'totalComments';
    const response = sortByStats(entries, sortBy);
    expectToMatchOrder(response, [
      'user2',
      'user1',
      'user3',
    ]);
  });

  it('sorts the entries by "openedPullRequests"', () => {
    const sortBy = 'openedPullRequests';
    const response = sortByStats(entries, sortBy);
    expectToMatchOrder(response, [
      'user3',
      'user1',
      'user2',
    ]);
  });

  it('nil values always go last', () => {
    const list = [...entries, { user: { id: 'user4' }, stats: {} }];
    const response1 = sortByStats(list, 'timeToReview');
    expect(getLastUserId(response1)).toEqual('user4');

    const response2 = sortByStats(list, 'totalComments');
    expect(getLastUserId(response2)).toEqual('user4');
  });
});
