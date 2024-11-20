const REGEXP_PATTERN = /^\/.+\/[a-z]*$/;

// Github usernames can only contain alphanumeric characters and dashes (-)
const sanitize = (str = '') => (str || '').replace(/[^-a-zA-Z0-9]/g, '').toLowerCase();

const isRegExp = (str) => REGEXP_PATTERN.test(str);

const parseRegExp = (str) => {
  const [pattern, flags] = str.split('/').slice(1);
  return new RegExp(pattern, flags);
};

module.exports = (excludeStr) => {
  if (!sanitize(excludeStr)) return [];
  if (isRegExp(excludeStr)) return parseRegExp(excludeStr);
  return excludeStr.split(',').map(sanitize);
};
