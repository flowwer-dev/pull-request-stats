const buildJsonOutput = require('../buildJsonOutput');

describe('Interactors | .alreadyPublished', () => {
  const inputs = {
    githubToken: 'GITHUB_TOKEN',
    personalToken: 'PERSONAL_TOKEN',
    org: 'ORGANIZATION',
    repos: ['REPO1', 'REPO2'],
    periodLength: 'PERIOD_LENGTH',
    foo: 'BAR',
  };
  const entries = 'ENTRIES';
  const pullRequest = 'PULL_REQUEST';
  const input = { inputs, entries, pullRequest };

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
      pullRequest,
      options: expect.objectContaining({
        organization: inputs.org,
        repositories: null,
        periodLength: inputs.periodLength,
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
