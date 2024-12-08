module.exports = ({
  params,
  entries,
  pullRequest,
}) => ({
  options: {
    organization: params.org || null,
    repositories: params.org ? null : params.repos,
    periodLength: params.periodLength,
  },
  entries,
  pullRequest,
});
