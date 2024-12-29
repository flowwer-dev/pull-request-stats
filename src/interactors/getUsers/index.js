const testFilter = require('./testFilter');
const findUsers = require('./findUsers');
const parseFilter = require('./parseFilter');

module.exports = (pulls, { excludeStr, includeStr } = {}) => {
  const include = parseFilter(includeStr);
  const exclude = parseFilter(excludeStr);
  const users = findUsers(pulls);

  return users
    .filter(({ login }) => !!login)
    .filter(({ login }) => !include || testFilter(include, login))
    .filter(({ login }) => !exclude || !testFilter(exclude, login));
};
