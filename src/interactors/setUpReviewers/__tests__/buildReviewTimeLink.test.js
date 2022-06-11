const reviewers = require('../../__tests__/mocks/reviewersWithStats.json');
const buildReviewTimeLink = require('../buildReviewTimeLink');

const [reviewer] = reviewers;

const SUCCESSFUL_LINK = "https://app.flowwer.dev/charts/review-time/~(u~(i~'1234~n~'user1)~p~30~r~(~(d~'qprzn9~t~'84)~(d~'qpvagu~t~'a3)~(d~'qpvn25~t~'3lu)~(d~'qqqtu5~t~'2vy)))";

const EMPTY_LINK = "https://app.flowwer.dev/charts/review-time/~(u~(i~'1234~n~'user1)~p~30~r~(~))";

const MAX_LENGTH = 1024;

const buildReview = (submittedAt) => ({
  timeToReview: 1000,
  submittedAt: new Date(submittedAt).toISOString(),
});

describe('Interactors | .buildTable | .buildReviewTimeLink', () => {
  const period = 30;

  it('builds the link correctly', () => {
    const response = buildReviewTimeLink(reviewer, period);

    expect(response).toEqual(SUCCESSFUL_LINK);
  });

  it('builds a link event with empty reviews', () => {
    const emptyReviewer = { ...reviewer, reviews: null };
    const response = buildReviewTimeLink(emptyReviewer, period);

    expect(response).toEqual(EMPTY_LINK);
  });

  it('limits the url to less than 1,024 characters', () => {
    const reviews = Array(100).fill().map((_e, index) => buildReview(index * 1000));
    const response = buildReviewTimeLink({ ...reviewer, reviews }, period);
    expect(response.length <= MAX_LENGTH).toEqual(true);
    expect(MAX_LENGTH - response.length < 16).toEqual(true);
  });
});
