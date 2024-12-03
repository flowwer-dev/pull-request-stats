module.exports = ({
  timeMs,
  tracker,
  pullRequest,
  entries,
}) => {
  const timeSec = Math.floor(timeMs / 1000);
  const timeMin = Math.floor(timeMs / 60000);
  const prAuthor = pullRequest?.author?.login;
  const reviewers = (entries || []).map((e) => e?.user?.login);
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
