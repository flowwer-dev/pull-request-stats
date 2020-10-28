const buildReviewTimeLink = require(`${ROOT_PATH}/src/interactors/build-table/build-review-time-link`);

const SUCCESSFUL_LINK = "https://app.flowwer.dev/charts/review-time/~(u~(i~'1031639~n~'user1)~p~30~r~(~(d~'qcrje2~t~'in)~(d~'qcriqr~t~'yy)~(d~'qb501r~t~'5r3)~(d~'qb3ws0~t~'i6)~(d~'q9m1p2~t~'9h)~(d~'q80dmr~t~'2kq)~(d~'q7zhh3~t~'46y)~(d~'q6h61o~t~'ld)))";

const EMPTY_LINK = "https://app.flowwer.dev/charts/review-time/~(u~(i~'1031639~n~'user1)~p~30~r~(~))";

describe('Interactors | .buildTable | .buildReviewTimeLink', () => {
  const [user] = global.TestUtils.data.reviewersWithStats;
  const period = 30;

  it('builds the link correctly', () => {
    const response = buildReviewTimeLink({ user, period });

    expect(response).toEqual(SUCCESSFUL_LINK);
  });

  it('builds a link event with empty reviews', () => {
    const emptyUser = { ...user, stats: { ...user.stats, reviews: null }};
    const response = buildReviewTimeLink({ user: emptyUser, period });

    expect(response).toEqual(EMPTY_LINK);
  });
});
