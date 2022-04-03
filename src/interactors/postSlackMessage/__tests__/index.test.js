const Fetchers = require('../../../fetchers');
const { t } = require('../../../i18n');
const buildSlackMessage = require('../buildSlackMessage');
const postSlackMessage = require('../index');

const MESSAGE = 'MESSAGE';

jest.mock('../../../fetchers', () => ({ postToSlack: jest.fn() }));
jest.mock('../buildSlackMessage', () => jest.fn(() => MESSAGE));

describe('Interactors | .postSlackMessage', () => {
  const debug = jest.fn();
  const error = jest.fn();

  const core = {
    debug,
    error,
  };

  const defaultOptions = {
    core,
    isSponsor: true,
    reviewers: 'REVIEWERS',
    pullRequest: 'PULl REQUEST',
    periodLength: 'PERIOD LENGTH',
    disableLinks: 'DISPLAY LINKS',
    displayCharts: 'DISPLAY CHARTS',
    slack: {
      webhook: 'https://slack.com/webhook',
      channel: '#my-channel',
    },
  };

  beforeEach(() => {
    debug.mockClear();
    error.mockClear();
    buildSlackMessage.mockClear();
    Fetchers.postToSlack.mockClear();
  });

  describe('when integration is not configured', () => {
    const expectDisabledIntegration = () => {
      expect(debug).toHaveBeenCalled();
      expect(buildSlackMessage).not.toHaveBeenCalled();
      expect(Fetchers.postToSlack).not.toHaveBeenCalled();
    };

    it('logs a message when webhook is not passed', async () => {
      const slack = { ...defaultOptions.slack, webhook: null };
      await postSlackMessage({ ...defaultOptions, slack });
      expectDisabledIntegration();
    });

    it('logs a message when channel is not passed', async () => {
      const slack = { ...defaultOptions.slack, channel: null };
      await postSlackMessage({ ...defaultOptions, slack });
      expectDisabledIntegration();
    });
  });

  describe('when user is not a sponsor', () => {
    it('logs a error', async () => {
      await postSlackMessage({ ...defaultOptions, isSponsor: false });
      expect(error).toHaveBeenCalled();
      expect(buildSlackMessage).not.toHaveBeenCalled();
      expect(Fetchers.postToSlack).not.toHaveBeenCalled();
    });
  });

  describe('when integration is enabled', () => {
    it('logs an error', async () => {
      await postSlackMessage({ ...defaultOptions });
      expect(error).not.toHaveBeenCalled();
      expect(buildSlackMessage).toHaveBeenCalledWith({
        reviewers: defaultOptions.reviewers,
        pullRequest: defaultOptions.pullRequest,
        periodLength: defaultOptions.periodLength,
        disableLinks: defaultOptions.disableLinks,
        displayCharts: defaultOptions.displayCharts,
      });
      expect(Fetchers.postToSlack).toHaveBeenCalledWith({
        webhook: defaultOptions.slack.webhook,
        channel: defaultOptions.slack.channel,
        message: MESSAGE,
        iconUrl: t('table.icon'),
        username: t('table.title'),
      });
    });
  });
});
