const getRepoComponents = (repo) => repo.split('/');

const getRepoOwner = (repo) => {
  const [owner] = getRepoComponents(repo);
  return owner;
};

module.exports = {
  getRepoComponents,
  getRepoOwner,
};
