const parser = require('../parser');
const fetchPullRequestById = require('../index');

jest.mock('../parser', () => jest.fn());

describe('Fetchers | .fetchPullRequestById', () => {
  const graphql = jest.fn(() => Promise.resolve());
  const octokit = { graphql };

  beforeEach(() => {
    graphql.mockClear();
    parser.mockClear();
  });

  it('builds the query and fetches data from Github API', async () => {
    const id = '123';
    await fetchPullRequestById(octokit, id);
    expect(graphql).toBeCalledTimes(1);
    expect(graphql).toBeCalledWith(
      expect.stringContaining('node(id: $id)'),
      {
        id,
      },
    );
  });

  it('parses the input', async () => {
    const id = '123';
    await fetchPullRequestById(octokit, id);
    expect(parser).toBeCalledTimes(1);
  });
});
