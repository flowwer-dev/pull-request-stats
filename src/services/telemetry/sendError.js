module.exports = ({ tracker, error }) => {
  const { message } = error || {};

  tracker.track('error', { message });
};
