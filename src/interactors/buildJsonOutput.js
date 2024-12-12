module.exports = ({
  inputs,
  entries,
  pullRequest,
}) => ({
  options: {
    organization: inputs.org || null,
    repositories: inputs.org ? null : inputs.repos,
    periodLength: inputs.periodLength,
  },
  entries,
  pullRequest,
});
