const parseInputs = require('../parseInputs');
const { VALID_STATS, DEFAULT_STATS } = require('../../config/stats');

const github = {
  context: {
    payload: {
      pull_request: {
        node_id: 'MDExOlB1bGxSZXF1ZXN0MzIwNjYwNjYw',
      },
    },
  },
};

const core = {
  getInput: jest.fn(),
  getBooleanInput: jest.fn(),
};

const baseInputs = {
  githubToken: 'GITHUB_TOKEN',
  token: 'PERSONAL_TOKEN',
  organization: 'ORGANIZATION',
  repositories: 'REPOSITORY1, REPOSITORY2',
  sortBy: 'REVIEWS',
  stats: `${VALID_STATS.join(',')}`,
  publishAs: 'COMMENT',
  period: '30',
  charts: 'true',
  disableLinks: 'true',
  limit: '10',
  exclude: 'EXCLUDE',
  telemetry: 'true',
  webhook: 'WEBHOOK',
  slackWebhook: 'SLACK_WEBHOOK',
  slackChannel: 'SLACK_CHANNEL',
  teamsWebhook: 'TEAMS_WEBHOOK',
};

describe('Parsers | .parseInputs', () => {
  const currentRepo = 'ORGANIZATION/CURRENT_REPO';

  const mockCore = (data = {}) => {
    const fullData = { ...baseInputs, ...data };
    core.getInput.mockImplementation((key) => fullData[key]);
    core.getBooleanInput.mockImplementation((key) => fullData[key] === 'true');
  };

  it('includes current repo', () => {
    mockCore();
    const response = parseInputs({ core, github, currentRepo });
    expect(response).toEqual(expect.objectContaining({
      currentRepo,
    }));
  });

  it('parses the inputs from the github variable', () => {
    mockCore();
    const response = parseInputs({ core, github, currentRepo });
    expect(response).toEqual(expect.objectContaining({
      pullRequestId: github.context.payload.pull_request.node_id,
    }));
  });

  it('parses the inputs from the core variable', () => {
    mockCore();
    const response = parseInputs({ core, github, currentRepo });
    expect(response).toEqual(expect.objectContaining({
      githubToken: baseInputs.githubToken,
      personalToken: baseInputs.token,
      org: baseInputs.organization,
      repos: ['REPOSITORY1', 'REPOSITORY2'],
      sortBy: baseInputs.sortBy,
      mainStats: VALID_STATS,
      publishAs: baseInputs.publishAs,
      periodLength: 30,
      displayCharts: true,
      disableLinks: true,
      limit: 10,
      excludeStr: baseInputs.exclude,
      telemetry: true,
      webhook: baseInputs.webhook,
      slack: {
        webhook: baseInputs.slackWebhook,
        channel: baseInputs.slackChannel,
      },
      teams: {
        webhook: baseInputs.teamsWebhook,
      },
    }));
  });

  describe('tokens', () => {
    it('uses the githubToken if token is not provided', () => {
      mockCore({ token: '' });
      const response = parseInputs({ core, github, currentRepo });
      expect(response.personalToken).toEqual(baseInputs.githubToken);
    });
  });

  describe('stats', () => {
    it('defaults to DEFAULT_STATS if no stats are provided', () => {
      mockCore({ stats: '' });
      const response = parseInputs({ core, github, currentRepo });
      expect(response.mainStats).toEqual(DEFAULT_STATS);
    });

    it('filters out invalid stats', () => {
      mockCore({ stats: `invalidStat,${VALID_STATS[0]}` });
      const response = parseInputs({ core, github, currentRepo });
      expect(response.mainStats).toEqual([VALID_STATS[0]]);
    });
  });
});
