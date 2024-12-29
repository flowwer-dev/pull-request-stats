const core = require('@actions/core');
const github = require('@actions/github');
const { t } = require('../i18n');
const { Telemetry } = require('../services');
const { getGithubApiUrl } = require('../config');
const { fetchPullRequestById } = require('../fetchers');
const {
  alreadyPublished,
  checkSponsorship,
  getPulls,
  getEntries,
  publish,
} = require('../interactors');
const execute = require('../execute');

jest.mock('@actions/core', () => ({
  info: jest.fn(),
  debug: jest.fn(),
}));

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn(),
}));

jest.mock('../services', () => ({
  Telemetry: jest.fn(),
}));

jest.mock('../config', () => ({
  getGithubApiUrl: jest.fn(),
}));

jest.mock('../fetchers', () => ({
  fetchPullRequestById: jest.fn(),
}));

jest.mock('../interactors', () => ({
  alreadyPublished: jest.fn(),
  checkSponsorship: jest.fn(),
  getPulls: jest.fn(),
  getEntries: jest.fn(),
  publish: jest.fn(),
}));

describe('execute', () => {
  const githubUrl = 'https://github.com';
  const entries = ['ENTRY1', 'ENTRY2', 'ENTRY3'];
  const pulls = ['PULL1', 'PULL2', 'PULL3'];
  const pullRequest = 'PULL_REQUEST';
  const isSponsor = 'isSponsor';
  const telemetry = {
    start: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  };
  const inputs = {
    org: 'org',
    repos: 'repos',
    mainStats: 'mainStats',
    limit: 'limit',
    sortBy: 'sortBy',
    periodLength: 'periodLength',
    disableLinks: 'disableLinks',
    displayCharts: 'displayCharts',
    publishAs: 'publishAs',
    pullRequestId: 'pullRequestId',
    excludeStr: 'excludeStr',
    includeStr: 'includeStr',
    slack: 'slack',
    teams: 'teams',
    webhook: 'webhook',
    telemetry: 'telemetry',
    githubToken: 'githubToken',
    personalToken: 'personalToken',
  };
  const globalOctokit = `OCTOKIT_${inputs.githubToken}`;
  const personalOctokit = `OCTOKIT_${inputs.personalToken}`;

  Telemetry.mockReturnValue(telemetry);
  getGithubApiUrl.mockReturnValue(githubUrl);
  checkSponsorship.mockResolvedValue(isSponsor);
  github.getOctokit.mockImplementation((token) => `OCTOKIT_${token}`);
  fetchPullRequestById.mockResolvedValue(pullRequest);
  alreadyPublished.mockReturnValue(false);
  getPulls.mockResolvedValue(pulls);
  getEntries.mockResolvedValue(entries);

  beforeEach(jest.clearAllMocks);

  it('executes the action successfully', async () => {
    const results = await execute(inputs);
    expect(results).toEqual({ entries, pullRequest });
    expect(fetchPullRequestById).toBeCalledWith(globalOctokit, inputs.pullRequestId);
    expect(alreadyPublished).toBeCalledWith(pullRequest);
    expect(getPulls).toBeCalledWith({
      org: inputs.org,
      repos: inputs.repos,
      octokit: personalOctokit,
      startDate: expect.any(Date),
    });
    expect(getEntries).toBeCalledWith({
      core,
      pulls,
      excludeStr: inputs.excludeStr,
      includeStr: inputs.includeStr,
      periodLength: inputs.periodLength,
    });
    expect(publish).toBeCalledWith({
      core,
      octokit: globalOctokit,
      entries,
      pullRequest,
      inputs: { ...inputs, isSponsor },
    });
  });

  it('does not request the pull request when not sending an id', async () => {
    const results = await execute({ ...inputs, pullRequestId: null });
    expect(results).toEqual({ entries, pullRequest: null });
    expect(fetchPullRequestById).not.toBeCalled();
    expect(alreadyPublished).toBeCalledWith(null);
    expect(getPulls).toBeCalled();
    expect(getEntries).toBeCalled();
    expect(publish).toBeCalled();
  });

  it('aborts the execution when stats are already published', async () => {
    alreadyPublished.mockReturnValueOnce(true);
    const results = await execute(inputs);
    expect(results).toBeNull();
    expect(fetchPullRequestById).toBeCalledWith(globalOctokit, inputs.pullRequestId);
    expect(alreadyPublished).toBeCalledWith(pullRequest);
    expect(getPulls).not.toBeCalled();
    expect(getEntries).not.toBeCalled();
    expect(publish).not.toBeCalled();
  });

  it('configures octokit correctly', async () => {
    await execute(inputs);
    expect(github.getOctokit).toBeCalledWith(inputs.githubToken, { baseUrl: githubUrl });
    expect(github.getOctokit).toBeCalledWith(inputs.personalToken, { baseUrl: githubUrl });
  });

  describe('Sponsorship', () => {
    it('checks if the user is a sponsor', async () => {
      checkSponsorship.mockResolvedValueOnce(true);
      await execute(inputs);
      expect(checkSponsorship).toBeCalledWith({
        octokit: globalOctokit,
        org: inputs.org,
        repos: inputs.repos,
      });
      expect(core.info).toBeCalledWith(t('execution.logs.sponsors'));
      expect(Telemetry).toBeCalledWith(expect.objectContaining({ isSponsor: true }));
    });

    it('disables feature when the user is not a sponsor', async () => {
      checkSponsorship.mockResolvedValueOnce(false);
      await execute(inputs);
      expect(checkSponsorship).toBeCalled();
      expect(core.info).not.toBeCalledWith(t('execution.logs.sponsors'));
      expect(Telemetry).toBeCalledWith(expect.objectContaining({ isSponsor: false }));
    });
  });

  describe('Telemetry', () => {
    it('tracks the start and end of a successful execution', async () => {
      const results = await execute(inputs);
      expect(Telemetry).toBeCalledWith({
        core,
        isSponsor,
        telemetry: inputs.telemetry,
      });
      expect(telemetry.start).toBeCalledWith(inputs);
      expect(telemetry.success).toBeCalledWith(results);
      expect(telemetry.error).not.toBeCalled();
    });

    it('tracks the start and end of a failed execution', async () => {
      const error = new Error('Failed execution');
      publish.mockRejectedValueOnce(error);
      await expect(execute(inputs)).rejects.toThrow(error);
      expect(Telemetry).toBeCalledWith({
        core,
        isSponsor,
        telemetry: inputs.telemetry,
      });
      expect(telemetry.start).toBeCalledWith(inputs);
      expect(telemetry.success).not.toBeCalled();
      expect(telemetry.error).toBeCalledWith(error);
    });
  });
});
