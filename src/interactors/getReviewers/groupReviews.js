module.exports = (pulls) => {
  const removeOwnPulls = ({ isOwnPull }) => !isOwnPull;

  const all = Object.values(pulls).reduce((acc, pull) => {
    const reviews = pull.reviews
      .filter(removeOwnPulls)
      .map((r) => ({ ...r, pullId: pull.id }));
    return acc.concat(reviews);
  }, []);

  const byAuthor = all.reduce((acc, review) => {
    const { author, isOwnPull, ...other } = review;
    const key = author.id;

    if (!acc[key]) acc[key] = { author, reviews: [] };

    acc[key].reviews.push(other);
    return acc;
  }, {});

  return Object.values(byAuthor);
};
