const Fetchers = require('../../../fetchers');
const buildMessage = require('../buildMessage');
const buildPayload = require('../buildPayload');
const postTeamsMessage = require('../index');

const MESSAGE = {
  blocks: [
    { type: 'section', text: 'MESSAGE' },
  ],
};

jest.mock('../../../fetchers', () => ({ postToWebhook: jest.fn(() => Promise.resolve()) }));
jest.mock('../buildMessage', () => jest.fn());
jest.mock('../buildPayload', () => jest.fn());

describe('Interactors | .postTeamsMessage', () => {
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
    teams: {
      webhook: 'https://microsoft.com/teams/webhook',
    },
  };

  const mockBuildMessage = (msg) => buildMessage.mockReturnValue(msg);

  const mockBuildPayload = () => buildPayload.mockImplementation((body) => ({ body }));

  beforeEach(() => {
    debug.mockClear();
    error.mockClear();
    buildMessage.mockClear();
    buildPayload.mockClear();
    Fetchers.postToWebhook.mockClear();
    mockBuildMessage(MESSAGE);
    mockBuildPayload();
  });

  describe('when integration is not configured', () => {
    const expectDisabledIntegration = () => {
      expect(debug).toHaveBeenCalled();
      expect(buildMessage).not.toHaveBeenCalled();
      expect(Fetchers.postToWebhook).not.toHaveBeenCalled();
    };

    it('logs a message when webhook is not passed', async () => {
      const teams = { ...defaultOptions.teams, webhook: null };
      await postTeamsMessage({ ...defaultOptions, teams });
      expectDisabledIntegration();
    });
  });

  describe('when integration is enabled', () => {
    it('posts successfully to Teams', async () => {
      await postTeamsMessage({ ...defaultOptions });
      expect(error).not.toHaveBeenCalled();
      expect(buildMessage).toBeCalledWith({
        reviewers: defaultOptions.reviewers,
        pullRequest: defaultOptions.pullRequest,
        periodLength: defaultOptions.periodLength,
        disableLinks: defaultOptions.disableLinks,
        displayCharts: defaultOptions.displayCharts,
      });
      expect(buildPayload).toBeCalledWith(MESSAGE);
      expect(Fetchers.postToWebhook).toBeCalledTimes(1);
      expect(Fetchers.postToWebhook).toBeCalledWith({
        webhook: defaultOptions.teams.webhook,
        payload: {
          body: MESSAGE,
        },
      });
    });

    it('posts multiple times with divided in chunks', async () => {
      const charsLimit = 40_000;
      const block1 = { type: 'ColumnSet', text: '1'.repeat(charsLimit) };
      const block2 = { type: 'ColumnSet', text: '2'.repeat(charsLimit) };
      const block3 = { type: 'ColumnSet', text: '3'.repeat(charsLimit) };
      mockBuildMessage([block1, block2, block3]);

      await postTeamsMessage({ ...defaultOptions });
      expect(error).not.toHaveBeenCalled();
      expect(buildMessage).toBeCalledTimes(1);
      expect(buildPayload).toBeCalledTimes(3);
      expect(Fetchers.postToWebhook).toBeCalledTimes(3);
      expect(Fetchers.postToWebhook).toHaveBeenNthCalledWith(1, expect.objectContaining({
        payload: { body: [block1] },
      }));
      expect(Fetchers.postToWebhook).toHaveBeenNthCalledWith(2, expect.objectContaining({
        payload: { body: [block2] },
      }));
      expect(Fetchers.postToWebhook).toHaveBeenNthCalledWith(3, expect.objectContaining({
        payload: { body: [block3] },
      }));
    });
  });
});
