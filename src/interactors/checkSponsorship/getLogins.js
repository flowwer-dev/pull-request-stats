const { getRepoOwner } = require('../../utils/repos');

module.exports = ({ org, repos } = {}) => {
  const logins = new Set();
  if (org) logins.add(org);
  (repos || []).forEach((repo) => logins.add(getRepoOwner(repo)));
  return [...logins];
};
