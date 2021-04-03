const { tracker } = require('../utils');

module.exports = (error) => {
  const { message } = error || {};

  tracker.track('error', { message });
};
