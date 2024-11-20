module.exports = (pulls) => {
  const openedPullRequests = pulls.length;

  return {
    openedPullRequests,
  };
};
