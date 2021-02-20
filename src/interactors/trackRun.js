const { tracker } = require('../utils');

module.exports = ({
  periodLength,
  org,
  repos,
  displayCharts,
  disableLinks,
  sortBy,
  currentRepo,
  sha
}) => {
  const [owner, repo] = currentRepo.split('/');
  const reposCount = (repos || []).length;
  const orgsCount = org ? 1 : 0;

  tracker.track('run', {
    periodLength,
    displayCharts,
    disableLinks,
    sortBy,
    currentRepo,
    reposCount,
    orgsCount,
    owner,
    repo,
    sha
  });
};
