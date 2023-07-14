const getPulls = require('../getPulls');
const { parsePullRequest } = require('../../parsers');
const { fetchPullRequests } = require('../../fetchers');

jest.mock('../../parsers', () => ({ parsePullRequest: jest.fn() }));
jest.mock('../../fetchers', () => ({ fetchPullRequests: jest.fn() }));

const buildResponse = (items) => {
  const edges = [{ cursor: 'CURSOR', node: { id: 123, author: null } }];

  for (let i = 0; i < items; i += 1) {
    edges.push({ cursor: 'CURSOR', node: { id: i, author: {} } });
  }

  return { search: { edges } };
};

describe('Interactors | .getPulls', () => {
  parsePullRequest.mockImplementation((data) => data);
  fetchPullRequests.mockImplementation(() => buildResponse(1));

  const octokit = 'OCTOKIT';
  const date = '2021-10-14T06:00:00.000Z';
  const input = {
    octokit,
    org: null,
    repos: ['org/repo1'],
    startDate: new Date(date),
    itemsPerPage: 3,
  };

  beforeEach(jest.clearAllMocks);

  describe('Building the query', () => {
    const testQuery = async ({ params, expectedQuery }) => {
      const results = await getPulls(params);
      expect(results.length).toBe(1);
      expect(parsePullRequest).toBeCalledTimes(1);
      expect(fetchPullRequests).toBeCalledTimes(1);
      expect(fetchPullRequests).toHaveBeenLastCalledWith({
        octokit,
        search: expectedQuery,
        limit: input.itemsPerPage,
      });
    };

    it('queries the correct date', () => {
      const tDate = '2021-06-12T06:00:00.000Z';
      const params = { ...input, startDate: new Date(tDate) };
      const expectedQuery = `type:pr sort:author-date repo:${input.repos[0]} created:>=${tDate}`;
      return testQuery({ params, expectedQuery });
    });

    it('queries for multiple repos when sending multiple', () => {
      const repos = ['org1/repo1', 'org1/repo2', 'org2/repo3'];
      const params = { ...input, repos };
      const reposFilter = `repo:${repos[0]} repo:${repos[1]} repo:${repos[2]}`;
      const expectedQuery = `type:pr sort:author-date ${reposFilter} created:>=${date}`;
      return testQuery({ params, expectedQuery });
    });

    it('queries for an organization when sending one, ignores repos if passed', () => {
      const org = 'mycoolorganization';
      const params = { ...input, org };
      const expectedQuery = `type:pr sort:author-date org:${org} created:>=${date}`;
      return testQuery({ params, expectedQuery });
    });
  });

  describe('Pagination', () => {
    it('passes the page limit', async () => {
      const itemsPerPage = 999;
      await getPulls({ ...input, itemsPerPage });
      expect(fetchPullRequests).toBeCalledTimes(1);
      expect(fetchPullRequests).toHaveBeenLastCalledWith(
        expect.objectContaining({
          limit: itemsPerPage,
        }),
      );
    });

    it('calls fetcher multiple times when there are more items', async () => {
      const itemsPerPage = 3;

      fetchPullRequests
        .mockReturnValueOnce(buildResponse(itemsPerPage))
        .mockReturnValueOnce(buildResponse(1));

      await getPulls({ ...input, itemsPerPage });
      expect(parsePullRequest).toBeCalledTimes(itemsPerPage + 1);
      expect(fetchPullRequests).toBeCalledTimes(2);
      expect(fetchPullRequests).toHaveBeenLastCalledWith(
        expect.objectContaining({
          after: 'CURSOR',
        }),
      );
    });

    it('calls fetcher the expected amount of times when there are null pr author items', async () => {
      const itemsPerPage = 3;

      const nullAuthorResponse = buildResponse(itemsPerPage);
      nullAuthorResponse.search.edges[0].node.author = null;

      fetchPullRequests
        .mockReturnValueOnce(nullAuthorResponse)
        .mockReturnValueOnce(buildResponse(1));

      await getPulls({ ...input, itemsPerPage });
      expect(parsePullRequest).toBeCalledTimes(itemsPerPage + 1);
      expect(fetchPullRequests).toBeCalledTimes(2);
      expect(fetchPullRequests).toHaveBeenLastCalledWith(
        expect.objectContaining({
          after: 'CURSOR',
        }),
      );
    });
  });
});
