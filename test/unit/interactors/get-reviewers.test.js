const getReviewers = require(`${ROOT_PATH}/src/interactors/get-reviewers`);

const EXPECTED_RESPONSE = [
  {
    id: 1031639,
    login: 'user1',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4',
    url: 'https://github.com/user1'
  },
  {
    id: 1081065,
    login: 'user3',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/1081065?v=4',
    url: 'https://github.com/user3'
  }
];

describe('Interactors | .getReviewers', () => {
  const input = global.TestUtils.data.repoPullRequests;

  it('returns all available reviewers in a set of pull requests', () => {
    const response = getReviewers(input);

    expect(response).toEqual(EXPECTED_RESPONSE);
  });
});
