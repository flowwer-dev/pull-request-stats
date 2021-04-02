const { tracker } = require('../utils');

module.exports = ({
  org,
  repos,
  sortBy,
  periodLength,
  displayCharts,
  disableLinks,
  currentRepo,
}) => {
  const [owner, repo] = currentRepo.split('/');
  const reposCount = (repos || []).length;
  const orgsCount = org ? 1 : 0;

  tracker.track('run', {
    repo,
    owner,
    currentRepo,
    sortBy,
    reposCount,
    orgsCount,
    periodLength,
    displayCharts,
    disableLinks,
  });
};
