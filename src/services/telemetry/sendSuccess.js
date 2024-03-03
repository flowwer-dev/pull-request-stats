module.exports = ({
  timeMs,
  tracker,
  pullRequest,
  reviewers: reviewersInput,
}) => {
  const timeSec = Math.floor(timeMs / 1000);
  const timeMin = Math.floor(timeMs / 60000);
  const prAuthor = pullRequest?.author?.login;
  const reviewers = (reviewersInput || []).map((r) => r?.author?.login);
  const reviewersCount = reviewers.length;

  tracker.track('success', {
    timeMs,
    timeSec,
    timeMin,
    prAuthor,
    reviewers,
    reviewersCount,
  });
};
