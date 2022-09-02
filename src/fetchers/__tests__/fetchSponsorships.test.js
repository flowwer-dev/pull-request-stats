const fetchSponsorships = require('../fetchSponsorships');

const logins = [
  'login1',
  'login2',
];

describe('Fetchers | .fetchSponsorships', () => {
  const data = { user: { login1: true, login2: false } };
  const graphql = jest.fn(() => Promise.resolve(data));
  const octokit = { graphql };

  beforeEach(() => {
    graphql.mockClear();
  });

  it('builds the query and fetches data from Github API', async () => {
    const response = await fetchSponsorships({ octokit, logins });
    expect(response).toEqual(data);
    expect(graphql).toHaveBeenCalledTimes(1);
    expect(graphql).toHaveBeenCalledWith(
      expect.stringContaining(`isSponsoredBy(accountLogin: "${logins[0]}")`),
    );
  });

  it('returns an empty response when request fails', async () => {
    const error = new Error("Field 'isSponsoredBy' doesn't exist on type 'User'");
    graphql.mockImplementation(() => Promise.reject(error));
    const response = await fetchSponsorships({ octokit, logins });
    expect(graphql).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ user: {} });
  });
});
