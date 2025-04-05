module.exports = async ({
  core,
  comments,
  statsByCommentId,
}) => {
  const commentsWithStats = comments.map((comment) => {
    const { id, ...stats } = statsByCommentId[comment?.id] || {};
    return {
      ...comment,
      stats,
    };
  });

  core.debug(`AI Stats for comments: ${JSON.stringify(commentsWithStats, null, 2)}`);
  await core.setOutput('aiCommentsStats', commentsWithStats);
};
