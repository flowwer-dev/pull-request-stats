const Fetchers = require('../../../fetchers');
const { t } = require('../../../i18n');
const buildMessage = require('../buildMessage');
const postSlackMessage = require('../index');

const MESSAGE = {
  blocks: [
    { type: 'section', text: 'MESSAGE' },
  ],
};

jest.mock('../../../fetchers', () => ({ postToSlack: jest.fn(() => Promise.resolve()) }));
jest.mock('../buildMessage', () => jest.fn());

describe('Interactors | .postSlackMessage', () => {
  const debug = jest.fn();
  const error = jest.fn();

  const core = {
    debug,
    error,
  };

  const defaultOptions = {
    core,
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

  const mockBuildMessage = (msg) => buildMessage.mockReturnValue(msg);

  beforeEach(() => {
    debug.mockClear();
    error.mockClear();
    buildMessage.mockClear();
    Fetchers.postToSlack.mockClear();
    mockBuildMessage(MESSAGE);
  });

  describe('when integration is not configured', () => {
    const expectDisabledIntegration = () => {
      expect(debug).toHaveBeenCalled();
      expect(buildMessage).not.toHaveBeenCalled();
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

  describe('when integration is enabled', () => {
    it('posts successfully to Slack', async () => {
      await postSlackMessage({ ...defaultOptions });
      expect(error).not.toHaveBeenCalled();
      expect(buildMessage).toBeCalledWith({
        reviewers: defaultOptions.reviewers,
        pullRequest: defaultOptions.pullRequest,
        periodLength: defaultOptions.periodLength,
        disableLinks: defaultOptions.disableLinks,
        displayCharts: defaultOptions.displayCharts,
      });
      expect(Fetchers.postToSlack).toBeCalledTimes(1);
      expect(Fetchers.postToSlack).toBeCalledWith({
        webhook: defaultOptions.slack.webhook,
        channel: defaultOptions.slack.channel,
        message: MESSAGE,
        iconUrl: t('table.icon'),
        username: t('table.title'),
      });
    });

    it('posts multiple times with divided in chunks', async () => {
      const charsLimit = 40_000;
      const block1 = { type: 'section', text: '1'.repeat(charsLimit) };
      const block2 = { type: 'section', text: '2'.repeat(charsLimit) };
      const block3 = { type: 'section', text: '3'.repeat(charsLimit) };
      mockBuildMessage({
        blocks: [block1, block2, block3],
      });

      await postSlackMessage({ ...defaultOptions });
      expect(error).not.toHaveBeenCalled();
      expect(buildMessage).toBeCalledTimes(1);
      expect(Fetchers.postToSlack).toBeCalledTimes(3);
      expect(Fetchers.postToSlack).toHaveBeenNthCalledWith(1, expect.objectContaining({
        message: { blocks: [block1] },
      }));
      expect(Fetchers.postToSlack).toHaveBeenNthCalledWith(2, expect.objectContaining({
        message: { blocks: [block2] },
      }));
      expect(Fetchers.postToSlack).toHaveBeenNthCalledWith(3, expect.objectContaining({
        message: { blocks: [block3] },
      }));
    });
  });
});
