const buildJsonOutput = require('../buildJsonOutput');

describe('Interactors | .alreadyPublished', () => {
  const inputs = {
    githubToken: 'GITHUB_TOKEN',
    personalToken: 'PERSONAL_TOKEN',
    org: 'ORGANIZATION',
    repos: ['REPO1', 'REPO2'],
    periodLength: 'PERIOD_LENGTH',
    foo: 'BAR',
    pullRequestId: 'PULL_REQUEST_ID',
  };
  const entries = 'ENTRIES';
  const input = { inputs, entries };

  it('removes tokens and unknown inputs', () => {
    const results = buildJsonOutput(input);
    expect(results).not.toHaveProperty('githubToken');
    expect(results).not.toHaveProperty('personalToken');
    expect(results).not.toHaveProperty('foo');
  });

  it('keeps entries, pull request and important inputs', () => {
    const results = buildJsonOutput(input);
    expect(results).toEqual(expect.objectContaining({
      entries,
      options: expect.objectContaining({
        organization: inputs.org,
        repositories: null,
        periodLength: inputs.periodLength,
        pullRequestId: inputs.pullRequestId,
      }),
    }));
  });

  it('uses repos when org is not sent', () => {
    const results = buildJsonOutput({
      ...input,
      inputs: { ...inputs, org: '' },
    });
    expect(results).toEqual(expect.objectContaining({
      options: expect.objectContaining({
        organization: null,
        repositories: inputs.repos,
      }),
    }));
  });
});
