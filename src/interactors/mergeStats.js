const { VALID_STATS } = require('../config/stats');

const EMPTY_STATS = VALID_STATS
  .reduce((acc, stat) => ({ ...acc, [stat]: null }), {});

module.exports = ({
  authors,
  reviewStats,
  pullRequestStats,
}) => {
  const reviewStatsByAuthorId = reviewStats.reduce((acc, reviewStat) => ({
    ...acc,
    [reviewStat.authorId]: reviewStat.stats,
  }), {});

  const prStatsByAuthorId = pullRequestStats.reduce((acc, prStat) => ({
    ...acc,
    [prStat.authorId]: prStat.stats,
  }), {});

  return authors.map((author) => ({
    author,
    stats: {
      ...EMPTY_STATS,
      ...(reviewStatsByAuthorId[author.id] || {}),
      ...(prStatsByAuthorId[author.id] || {}),
    },
  }));
};
