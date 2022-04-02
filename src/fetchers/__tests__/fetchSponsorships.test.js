const fetchSponsorships = require('../fetchSponsorships');

const logins = [
  'login1',
  'login2',
];

describe('Fetchers | .fetchSponsorships', () => {
  const graphql = jest.fn(() => Promise.resolve());
  const octokit = { graphql };

  beforeEach(() => {
    graphql.mockClear();
  });

  it('builds the query and fetches data from Github API', async () => {
    await fetchSponsorships({ octokit, logins });
    expect(graphql).toHaveBeenCalledTimes(1);
    expect(graphql).toHaveBeenCalledWith(
      expect.stringContaining(`isSponsoredBy(accountLogin: "${logins[0]}")`),
    );
  });
});
