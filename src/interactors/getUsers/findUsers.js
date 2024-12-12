module.exports = (pulls) => {
  const byId = {};

  pulls.forEach((pull) => {
    const { author, reviews } = pull;
    byId[author.id] = author;
    reviews.forEach((review) => {
      if (review.author) byId[review.author.id] = review.author;
    });
  });

  return Object.values(byId).filter(Boolean);
};
