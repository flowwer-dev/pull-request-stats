const reviewers = require('../../__tests__/mocks/reviewersWithStats.json');
const buildReviewTimeLink = require('../buildReviewTimeLink');

const [reviewer] = reviewers;

const SUCCESSFUL_LINK = "https://app.flowwer.dev/charts/review-time/~(u~(i~'1234~n~'user1)~p~30~r~(~(d~'qpvagu~t~'a3)~(d~'qpvn25~t~'3lu)~(d~'qprzn9~t~'84)~(d~'qqqtu5~t~'2vy)))";

const EMPTY_LINK = "https://app.flowwer.dev/charts/review-time/~(u~(i~'1234~n~'user1)~p~30~r~(~))";

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
});
