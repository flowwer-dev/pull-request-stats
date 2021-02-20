const ID_PREFIX = 'https://avatars.githubusercontent.com/u/';
const ID_REGEXP = /^[0-9]+/

const extractId = (url) => url.replace(ID_PREFIX, '').match(ID_REGEXP)[0];

module.exports = (data = {}) => ({
  id: extractId(data.avatarUrl),
  url: data.url,
  login: data.login,
  avatarUrl: data.avatarUrl
});
