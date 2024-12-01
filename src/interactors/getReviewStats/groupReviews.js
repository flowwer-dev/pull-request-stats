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

  const byAuthor = all.reduce((acc, review) => {
    const { author, isOwnPull, ...other } = review;
    const authorId = author.id;

    if (!acc[authorId]) acc[authorId] = { authorId, reviews: [] };

    acc[authorId].reviews.push(other);
    return acc;
  }, {});

  return Object.values(byAuthor);
};
