const Fetchers = require('../../../fetchers');
const buildPayload = require('../buildPayload');
const postWebhook = require('../index');

const PAYLOAD = 'PAYLOAD';

jest.mock('../../../fetchers', () => ({ postToWebhook: jest.fn(() => Promise.resolve()) }));
jest.mock('../buildPayload', () => jest.fn(() => PAYLOAD));

describe('Interactors | .postWebhook', () => {
  const debug = jest.fn();
  const error = jest.fn();

  const core = {
    debug,
    error,
  };

  const defaultOptions = {
    core,
    org: 'ORGANIZATION',
    repos: 'REPOSITORIES',
    webhook: 'https://somewebhook.com/',
    reviewers: 'REVIEWERS',
    periodLength: 'PERIOD LENGTH',
  };

  beforeEach(() => {
    debug.mockClear();
    error.mockClear();
    buildPayload.mockClear();
    Fetchers.postToWebhook.mockClear();
  });

  describe('when integration is not configured', () => {
    const expectDisabledIntegration = () => {
      expect(debug).toHaveBeenCalled();
      expect(buildPayload).not.toHaveBeenCalled();
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
      expect(buildPayload).toBeCalledWith({
        org: defaultOptions.org,
        repos: defaultOptions.repos,
        reviewers: defaultOptions.reviewers,
        periodLength: defaultOptions.periodLength,
      });
      expect(Fetchers.postToWebhook).toBeCalledTimes(1);
      expect(Fetchers.postToWebhook).toBeCalledWith({
        payload: PAYLOAD,
        webhook: defaultOptions.webhook,
      });
    });
  });
});
