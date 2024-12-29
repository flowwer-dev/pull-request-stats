module.exports = (filter, username) => {
  if (filter.test) return filter.test(username);
  if (filter.includes) return filter.includes(username);
  return false;
};
