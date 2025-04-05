const { AI_STATS } = require('../../config/stats');
const getCommentsStats = require('./getCommentsStats');
const getAllComments = require('./getAllComments');
const debugResults = require('./debugResults');

module.exports = async ({
  core,
  pulls,
  openaiApiKey,
  mainStats,
}) => {
  const needsAI = mainStats.some((stat) => AI_STATS.includes(stat));
  if (!needsAI) return {};

  if (needsAI && !openaiApiKey) {
    core.setFailed('openaiApiKey is required to calculate the qualitative stats');
    return {};
  }

  const comments = getAllComments(pulls);
  if (comments.length === 0) return {};

  const statsByCommentId = await getCommentsStats({
    core,
    comments,
    openaiApiKey,
  });

  await debugResults({
    core,
    comments,
    statsByCommentId,
  });

  return statsByCommentId;
};
