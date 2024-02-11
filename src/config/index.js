const getSlackLimits = () => ({
  chars: 30_000,
  blocks: 50,
});
const getTeamsBytesLimit = () => 27_000;

module.exports = {
  getSlackLimits,
  getTeamsBytesLimit,
};
