module.exports = (exclude, username) => {
  if (exclude.test) return !exclude.test(username);
  if (exclude.includes) return !exclude.includes(username);
  return true;
};
