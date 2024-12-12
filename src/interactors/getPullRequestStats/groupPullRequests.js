module.exports = (pulls) => {
  const byAuthor = pulls.reduce((acc, pull) => {
    const userId = pull.author.id;

    if (!acc[userId]) acc[userId] = { userId, pullRequests: [] };

    acc[userId].pullRequests.push({
      id: pull.id,
      submittedAt: pull.submittedAt,
    });
    return acc;
  }, {});

  return Object.values(byAuthor);
};
