const Mixpanel = require('mixpanel');
const project = require('../../../package.json');

const MIXPANEL_TOKEN = '6a91c23a5c49e341a337954443e1f2a0';

const getContext = () => ({ version: project.version });

const buildTracker = () => {
  const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);
  const context = getContext();

  const track = (event, properties) => mixpanel.track(event, {
    ...context,
    ...properties,
  });

  return {
    track,
  };
};

module.exports = buildTracker;
