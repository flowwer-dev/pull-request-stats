module.exports = (params) => {
  const { githubToken, personalToken, ...other } = params;
  return other;
};
