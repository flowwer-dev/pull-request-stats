module.exports = ({
  inputs,
  entries,
}) => ({
  entries,
  options: {
    organization: inputs.org || null,
    repositories: inputs.org ? null : inputs.repos,
    periodLength: inputs.periodLength,
    pullRequestId: inputs.pullRequestId,
  },
});
