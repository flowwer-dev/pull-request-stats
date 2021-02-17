const { fetchPullRequests } = require('../fetchers');
const { parsePullRequests } = require('../parsers');

const ownerFilter = ({ org, repos }) => {
  if (org) return `org:${org}`;
  return (repos || []).map(r => `repo:${r}`).join(' ');
};

const buildQuery = ({ org, repos, startDate }) => {
  const dateFilter = `created:>=${startDate.toISOString()}`;
  return `type:pr -review:none ${ownerFilter({ org, repos })} ${dateFilter} sort:author-date`;
};

const getPullRequests = ({
  octokit, query, limit, after = null
}) => {
  const data = fetchPullRequests({
    octokit, query, limit, after
  });
  const results = data.edges.map(parsePullRequests);
  if (results.length < limit) return results;

  const last = results[results.length - 1].cursor;
  return results.concat(getPullRequests({ query, limit, after: last }));
};

module.exports = ({
  octokit,
  org,
  repos,
  startDate,
  itemsPerPage = 100
}) => {
  const query = buildQuery({ org, repos, startDate });
  return getPullRequests({ octokit, query, limit: itemsPerPage });
};
