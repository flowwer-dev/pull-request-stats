module.exports = (pulls) => {
  const removeOwnPulls = ({ isOwnPull }) => !isOwnPull;

  return Object.values(pulls.reduce((reviewers, pull) => {
    const users = pull.reviews
      .filter(removeOwnPulls)
      .reduce((users, {user}) => ({ ...users, [user.id]: user }), {});

    return { ...reviewers, ...users };
  }, {}));
};
