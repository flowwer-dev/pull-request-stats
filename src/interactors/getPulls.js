const { fetchPullRequests } = require('../fetchers');
const { parsePullRequest } = require('../parsers');

const filterNullAuthor = ({ node }) => !!node.author;

const ownerFilter = ({ org, repos }) => {
  if (org) return `org:${org}`;
  return (repos || []).map((r) => `repo:${r}`).join(' ');
};

const buildQuery = ({ org, repos, startDate }) => {
  const dateFilter = `created:>=${startDate.toISOString()}`;
  return `type:pr sort:author-date ${ownerFilter({ org, repos })} ${dateFilter}`;
};

const getPullRequests = async (params) => {
  const { limit } = params;
  const data = await fetchPullRequests(params);
  const edges = data.search.edges || [];
  const results = edges
    .filter(filterNullAuthor)
    .map(parsePullRequest);

  if (edges.length < limit) return results;

  const last = results[results.length - 1].cursor;
  return results.concat(await getPullRequests({ ...params, after: last }));
};

module.exports = ({
  octokit,
  org,
  repos,
  startDate,
  itemsPerPage = 100,
}) => {
  const search = buildQuery({ org, repos, startDate });
  return getPullRequests({ octokit, search, limit: itemsPerPage });
};
