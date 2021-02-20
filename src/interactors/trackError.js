const { tracker } = require('../utils');

module.exports = (error) => {
  const message = (error || {}).message;

  tracker.track('error', { message });
};
