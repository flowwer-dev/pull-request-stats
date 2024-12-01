const buildJsonOutput = require('../buildJsonOutput');

describe('Interactors | .alreadyPublished', () => {
  const params = {
    githubToken: 'GITHUB_TOKEN',
    personalToken: 'PERSONAL_TOKEN',
    reviewers: 'REVIEWERS',
    foo: 'BAR',
  };

  it('removes tokens', () => {
    const results = buildJsonOutput(params);
    expect(results).not.toHaveProperty('githubToken');
    expect(results).not.toHaveProperty('personalToken');
  });

  it('keeps the other properties', () => {
    const results = buildJsonOutput(params);
    const { githubToken, personalToken, ...other } = params;
    expect(results).toEqual(expect.objectContaining({
      ...other,
    }));
  });
});
