const Fetchers = require('../../fetchers');
const postWebhook = require('../postWebhook');

jest.mock('../../fetchers', () => ({ postToWebhook: jest.fn(() => Promise.resolve()) }));

describe('Interactors | .postWebhook', () => {
  const debug = jest.fn();
  const error = jest.fn();
  const payload = 'PAYLOAD';
  const webhook = 'https://somewebhook.com/';
  const core = {
    debug,
    error,
  };

  const defaultOptions = {
    core,
    payload,
    webhook,
  };

  beforeEach(() => {
    debug.mockClear();
    error.mockClear();
    Fetchers.postToWebhook.mockClear();
  });

  describe('when integration is not configured', () => {
    const expectDisabledIntegration = () => {
      expect(debug).toHaveBeenCalled();
      expect(Fetchers.postToWebhook).not.toHaveBeenCalled();
    };

    it('logs a message when webhook is not passed', async () => {
      await postWebhook({ ...defaultOptions, webhook: null });
      expectDisabledIntegration();
    });
  });

  describe('when integration is enabled', () => {
    it('posts successfully to webhook', async () => {
      await postWebhook({ ...defaultOptions });
      expect(error).not.toHaveBeenCalled();
      expect(Fetchers.postToWebhook).toBeCalledTimes(1);
      expect(Fetchers.postToWebhook).toBeCalledWith({
        payload,
        webhook,
      });
    });
  });
});
