const getSlackLimits = () => ({
  chars: 30_000,
  blocks: 50,
});
const getTeamsBytesLimit = () => 27_000;
const getGithubApiUrl = () => process.env.GITHUB_API_URL || 'https://api.github.com';
const getGithubServerUrl = () => process.env.GITHUB_SERVER_URL || 'https://github.com';
module.exports = {
  getSlackLimits,
  getTeamsBytesLimit,
  getGithubApiUrl,
  getGithubServerUrl,
};
