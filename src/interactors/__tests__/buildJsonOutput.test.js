const buildJsonOutput = require('../buildJsonOutput');

describe('Interactors | .alreadyPublished', () => {
  const params = {
    githubToken: 'GITHUB_TOKEN',
    personalToken: 'PERSONAL_TOKEN',
    org: 'ORGANIZATION',
    repos: ['REPO1', 'REPO2'],
    periodLength: 'PERIOD_LENGTH',
    foo: 'BAR',
  };
  const entries = 'ENTRIES';
  const pullRequest = 'PULL_REQUEST';
  const input = { params, entries, pullRequest };

  it('removes tokens and unknown params', () => {
    const results = buildJsonOutput(input);
    expect(results).not.toHaveProperty('githubToken');
    expect(results).not.toHaveProperty('personalToken');
    expect(results).not.toHaveProperty('foo');
  });

  it('keeps entries, pull request and important params', () => {
    const results = buildJsonOutput(input);
    expect(results).toEqual(expect.objectContaining({
      entries,
      pullRequest,
      options: expect.objectContaining({
        organization: params.org,
        repositories: null,
        periodLength: params.periodLength,
      }),
    }));
  });

  it('uses repos when org is not sent', () => {
    const results = buildJsonOutput({
      ...input,
      params: { ...params, org: '' },
    });
    expect(results).toEqual(expect.objectContaining({
      options: expect.objectContaining({
        organization: null,
        repositories: params.repos,
      }),
    }));
  });
});
