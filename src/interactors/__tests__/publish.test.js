const buildTable = require('../buildTable');
const buildComment = require('../buildComment');
const buildJsonOutput = require('../buildJsonOutput');
const buildMarkdown = require('../buildMarkdown');
const postComment = require('../postComment');
const postSlackMessage = require('../postSlackMessage');
const postSummary = require('../postSummary');
const postTeamsMessage = require('../postTeamsMessage');
const postWebhook = require('../postWebhook');
const publish = require('../publish');

jest.mock('../buildTable', () => jest.fn());
jest.mock('../buildComment', () => jest.fn());
jest.mock('../buildJsonOutput', () => jest.fn());
jest.mock('../buildMarkdown', () => jest.fn());
jest.mock('../postComment', () => jest.fn());
jest.mock('../postSlackMessage', () => jest.fn());
jest.mock('../postSummary', () => jest.fn());
jest.mock('../postTeamsMessage', () => jest.fn());
jest.mock('../postWebhook', () => jest.fn());

describe('Interactors | .publish', () => {
  const entries = ['ENTRY1', 'ENTRY2', 'ENTRY3'];
  const table = 'TABLE';
  const octokit = 'OCTOKIT';
  const pullRequest = 'PULL_REQUEST';
  const markdownTable = 'MARKDOWN_TABLE';
  const comment = 'COMMENT';
  const jsonOutput = 'JSON_OUTPUT';
  const core = {
    setOutput: jest.fn(),
    debug: jest.fn(),
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
    isSponsor: 'isSponsor',
    slack: 'slack',
    teams: 'teams',
    webhook: 'webhook',
  };
  const params = {
    core,
    octokit,
    entries,
    pullRequest,
    inputs,
  };

  buildTable.mockReturnValue(table);
  buildMarkdown.mockReturnValue(markdownTable);
  buildComment.mockReturnValue(comment);
  buildJsonOutput.mockReturnValue(jsonOutput);

  beforeEach(jest.clearAllMocks);

  it('calls the correct interactors with the expected params', async () => {
    await publish(params);

    expect(buildTable).toBeCalled();
    expect(buildMarkdown).toBeCalledWith({ table });
    expect(buildComment).toBeCalled();
    expect(buildJsonOutput).toBeCalledWith({ inputs, entries, pullRequest });
    expect(postWebhook).toBeCalledWith({ core, payload: jsonOutput, webhook: inputs.webhook });
    expect(postSlackMessage).toBeCalled();
    expect(postTeamsMessage).toBeCalled();
    expect(postSummary).toBeCalledWith({ core, content: comment });
    expect(core.setOutput).toBeCalledWith('resultsMd', markdownTable);
    expect(core.setOutput).toBeCalledWith('resultsJson', jsonOutput);
    expect(postComment).toBeCalled();
    expect(core.debug).toBeCalledTimes(4);
  });

  it('builds the table with the correct params', async () => {
    await publish(params);
    expect(buildTable).toBeCalledWith({
      entries,
      limit: inputs.limit,
      sortBy: inputs.sortBy,
      mainStats: inputs.mainStats,
      disableLinks: inputs.disableLinks,
      displayCharts: inputs.displayCharts,
    });
  });

  it('build the markdown comment with the correct params', async () => {
    await publish(params);
    expect(buildComment).toBeCalledWith({
      org: inputs.org,
      repos: inputs.repos,
      periodLength: inputs.periodLength,
      markdownTable,
      isSponsor: inputs.isSponsor,
    });
  });

  it('posts on slack with the correct params', async () => {
    await publish(params);
    expect(postSlackMessage).toBeCalledWith({
      core,
      org: inputs.org,
      repos: inputs.repos,
      table,
      periodLength: inputs.periodLength,
      pullRequest,
      isSponsor: inputs.isSponsor,
      slack: inputs.slack,
    });
  });

  it('posts on teams with the correct params', async () => {
    await publish(params);
    expect(postTeamsMessage).toBeCalledWith({
      core,
      org: inputs.org,
      repos: inputs.repos,
      table,
      periodLength: inputs.periodLength,
      pullRequest,
      isSponsor: inputs.isSponsor,
      teams: inputs.teams,
    });
  });

  it('posts a comment the pull request id is provided', async () => {
    await publish(params);
    expect(postComment).toBeCalledWith({
      octokit,
      content: comment,
      publishAs: inputs.publishAs,
      pullRequestId: inputs.pullRequestId,
      currentBody: pullRequest.body,
    });
  });

  it('does not post a comment if the pull request id is not provided', async () => {
    await publish({
      ...params,
      inputs: { ...inputs, pullRequestId: null },
    });
    expect(postComment).not.toBeCalled();
  });
});
