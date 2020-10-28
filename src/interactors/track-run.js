const { tracker } = require('../utils');

module.exports = ({
  periodLength,
  repositories,
  displayCharts,
  disableLinks,
  sortBy,
  currentRepo,
  sha
}) => {
  const [owner, repo] = currentRepo.split('/');
  const reposCount = repositories.length;

  tracker.track('run', {
    periodLength,
    displayCharts,
    disableLinks,
    sortBy,
    currentRepo,
    reposCount,
    owner,
    repo,
    sha
  });
};
