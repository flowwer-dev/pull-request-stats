const parsePullRequest = require(`${ROOT_PATH}/src/parsers/parse-pull-request`);

const EXPECTED_RESPONSE = {
  id: 444110279,
  number: 470,
  state: 'open',
  url: 'https://github.com/username/repo-name/pull/470',
  user: {
    id: 1081065,
    login: 'user1',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/1081065?v=4',
    url: 'https://github.com/user1'
  },
  createdAt: new Date('2020-07-03T15:27:14Z'),
  updatedAt: new Date('2020-07-03T17:04:03Z')
};

describe('Parsers | .parsePullRequest', () => {
  const [input] = global.TestUtils.responses.pullRequests.data;

  it('parses a pull request response to a simpler one', () => {
    const response = parsePullRequest(input);

    expect(response).toEqual(EXPECTED_RESPONSE);
  });
});
