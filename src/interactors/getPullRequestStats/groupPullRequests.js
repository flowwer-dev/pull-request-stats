module.exports = (pulls) => {
  const byAuthor = pulls.reduce((acc, pull) => {
    const authorId = pull.author.id;

    if (!acc[authorId]) acc[authorId] = { authorId, pullRequests: [] };

    acc[authorId].pullRequests.push({
      id: pull.id,
      submittedAt: pull.submittedAt,
    });
    return acc;
  }, {});

  return Object.values(byAuthor);
};
