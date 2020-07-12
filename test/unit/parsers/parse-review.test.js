const parseReview = require(`${ROOT_PATH}/src/parsers/parse-review`);

const EXPECTED_RESPONSE = {
  id: 80,
  state: 'APPROVED',
  submittedAt: new Date('2019-11-17T17:43:43Z'),
  user: {
    id: 1,
    login: 'octocat',
    avatarUrl: 'https://github.com/images/error/octocat_happy.gif',
    url: 'https://github.com/octocat'
  },
  isOwnPull: false
};

describe('Parsers | .parseReview', () => {
  const [input] = global.TestUtils.responses.reviews;

  it('parses a pull request review response to a simpler one', () => {
    const response = parseReview(input);

    expect(response).toEqual(EXPECTED_RESPONSE);
  });

  it('returns isOwnPull true when user is the pull owner', () => {
    const response = parseReview(input, 1);

    expect(response).toEqual({
      ...EXPECTED_RESPONSE,
      isOwnPull: true
    });
  });
});
