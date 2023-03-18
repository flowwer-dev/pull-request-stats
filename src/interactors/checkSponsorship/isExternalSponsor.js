const axios = require('axios');
const crypto = require('crypto');
const core = require('@actions/core');
const { t } = require('../../i18n');

// A list of organizations which are sponsoring this project outside Github 💙
// (hashed to keep them private)
const FILE_URL = 'https://raw.githubusercontent.com/manuelmhtr/private-sponsors/main/list.json';
const offlineSponsors = new Set([
  'd6ffa1c8205ff50605752d1fff1fa180',
]);

const getHash = (str) => crypto
  .createHash('md5')
  .update(str.toLowerCase())
  .digest('hex');

// Get a json file from a url
const getList = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data || [];
    core.debug(t('execution.sponsors.external.fetch.success', { data }));
    return new Set([...data, ...offlineSponsors]);
  } catch (error) {
    core.error(t('execution.sponsors.external.fetch.error', { error }));
    return offlineSponsors;
  }
};

module.exports = async (logins) => {
  const list = await getList(FILE_URL);
  return [...(logins || [])]
    .some((login) => list.has(getHash(login)));
};
