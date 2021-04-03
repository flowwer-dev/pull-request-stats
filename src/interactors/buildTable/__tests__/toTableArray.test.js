const toTableArray = require('../toTableArray');

const TABLE_DATA = [
  {
    avatar: '',
    username: 'User',
    timeToReview: 'Median time to review',
    totalReviews: 'Total reviews',
    totalComments: 'Total comments',
  },
  {
    avatar: 'avatar1',
    username: 'user1',
    timeToReview: '34m',
    totalReviews: '4',
    totalComments: '1',
  },
  {
    avatar: 'avatar2',
    username: 'user2',
    timeToReview: '2h 21m',
    totalReviews: '1',
    totalComments: '5',
  },
];

const BY_TOTAL_REVIEWS = [
  ['', 'User', 'Total reviews', 'Median time to review', 'Total comments'],
  ['avatar1', 'user1', '4', '34m', '1'],
  ['avatar2', 'user2', '1', '2h 21m', '5'],
];

const BY_TIME_TO_REVIEW = [
  ['', 'User', 'Median time to review', 'Total reviews', 'Total comments'],
  ['avatar1', 'user1', '34m', '4', '1'],
  ['avatar2', 'user2', '2h 21m', '1', '5'],
];

const BY_TOTAL_COMMENTS = [
  ['', 'User', 'Total comments', 'Total reviews', 'Median time to review'],
  ['avatar1', 'user1', '1', '4', '34m'],
  ['avatar2', 'user2', '5', '1', '2h 21m'],
];

describe('Interactors | .buildTable | .toTableArray', () => {
  it('sorts the table columns by "totalReviews" when sortBy is not specified', () => {
    const sortBy = null;
    const response = toTableArray(TABLE_DATA, sortBy);
    expect(response).toEqual(BY_TOTAL_REVIEWS);
  });

  it('sorts the table columns by "timeToReview" when sortBy is TIME', () => {
    const sortBy = 'TIME';
    const response = toTableArray(TABLE_DATA, sortBy);
    expect(response).toEqual(BY_TIME_TO_REVIEW);
  });

  it('sorts the table columns by "totalComments" when sortBy is COMMENTS', () => {
    const sortBy = 'COMMENTS';
    const response = toTableArray(TABLE_DATA, sortBy);
    expect(response).toEqual(BY_TOTAL_COMMENTS);
  });

  it('sorts the table columns by "totalReviews" when sortBy is REVIEWS', () => {
    const sortBy = 'REVIEWS';
    const response = toTableArray(TABLE_DATA, sortBy);
    expect(response).toEqual(BY_TOTAL_REVIEWS);
  });
});
