const filterUser = require('./filterUser');
const findUsers = require('./findUsers');
const parseExclude = require('./parseExclude');

module.exports = (pulls, { excludeStr } = {}) => {
  const exclude = parseExclude(excludeStr);
  const users = findUsers(pulls);

  return users
    .filter(({ login }) => filterUser(exclude, login));
};
