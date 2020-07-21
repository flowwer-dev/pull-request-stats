const { tracker } = require('../utils');

module.exports = ({
  periodLength,
  repositories,
  displayCharts,
  sortBy,
  currentRepo,
  sha
}) => {
  const [owner, repo] = currentRepo.split('/');
  const reposCount = repositories.length;

  tracker.track('run', {
    periodLength,
    displayCharts,
    sortBy,
    currentRepo,
    reposCount,
    owner,
    repo,
    sha
  });
};
