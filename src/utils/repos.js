const getRepoComponents = (repo) => repo.split('/');

const getRepoOwner = (repo) => {
  const [owner] = getRepoComponents(repo);
  return owner;
};

const getRepoName = (repo) => {
  const [, name] = getRepoComponents(repo);
  return name;
};

module.exports = {
  getRepoComponents,
  getRepoOwner,
  getRepoName,
};
