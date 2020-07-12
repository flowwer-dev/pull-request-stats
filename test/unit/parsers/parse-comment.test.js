const parseComment = require(`${ROOT_PATH}/src/parsers/parse-comment`);

const EXPECTED_RESPONSE = {
  id: 10,
  createdAt: new Date('2011-04-14T16:00:49Z'),
  user: {
    id: 1,
    login: 'octocat',
    avatarUrl: 'https://github.com/images/error/octocat_happy.gif',
    url: 'https://github.com/octocat'
  },
  isOwnPull: false
};

describe('Parsers | .parseComment', () => {
  const [input] = global.TestUtils.responses.comments;

  it('parses a pull request comment response to a simpler one', () => {
    const response = parseComment(input);

    expect(response).toEqual(EXPECTED_RESPONSE);
  });

  it('returns isOwnPull true when user is the pull owner', () => {
    const response = parseComment(input, 1);

    expect(response).toEqual({
      ...EXPECTED_RESPONSE,
      isOwnPull: true
    });
  });
});
