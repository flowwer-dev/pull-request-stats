const sanitize = (str) => String(str).toLowerCase();

module.exports = (filter, username) => {
  if (filter.test) return filter.test(username);
  if (filter.includes) return filter.includes(sanitize(username));
  return false;
};
