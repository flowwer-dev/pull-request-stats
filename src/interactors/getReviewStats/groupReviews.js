module.exports = (pulls) => {
  const removeOwnPulls = ({ isOwnPull }) => !isOwnPull;

  const removeWithEmptyId = ({ id }) => !!id;

  const all = Object.values(pulls).reduce((acc, pull) => {
    const reviews = pull.reviews
      .filter(removeOwnPulls)
      .filter(removeWithEmptyId)
      .map((r) => ({ ...r, pullRequestId: pull.id }));
    return acc.concat(reviews);
  }, []);

  const byUser = all.reduce((acc, review) => {
    const { author, isOwnPull, ...other } = review;
    const userId = author.id;

    if (!acc[userId]) acc[userId] = { userId, reviews: [] };

    acc[userId].reviews.push(other);
    return acc;
  }, {});

  return Object.values(byUser);
};
