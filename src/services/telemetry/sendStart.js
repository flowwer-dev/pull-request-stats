const { getRepoOwner } = require('../../utils/repos');

module.exports = ({
  org,
  repos,
  sortBy,
  periodLength,
  displayCharts,
  disableLinks,
  currentRepo,
  limit,
  tracker,
}) => {
  const owner = getRepoOwner(currentRepo);
  const reposCount = (repos || []).length;
  const orgsCount = org ? 1 : 0;

  tracker.track('run', {
    // Necessary to build the "Used by" section in Readme:
    owner,
    // Necessary to learn if used against specific repos or full organizations:
    orgsCount,
    reposCount,
    currentRepo,
    // Necessary to learn which options are commonly used and improve them:
    sortBy,
    periodLength,
    displayCharts,
    disableLinks,
    limit,
  });
};
