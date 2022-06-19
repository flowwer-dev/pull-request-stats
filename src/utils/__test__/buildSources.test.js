const buildSources = require('../buildSources');

const ORG = 'org';
const REPO1 = 'org/repo1';
const REPO2 = 'org/repo2';
const REPO3 = 'org/repo3';
const REPO4 = 'org/repo4';

const link = (path) => `[${path}](https://github.com/${path})`;

describe('Interactors | .sources', () => {
  describe('when sending and organization', () => {
    const expected = `${link(ORG)}`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink: link, org: ORG, repos: null });
      expect(response).toEqual(expected);
    });
  });

  describe('when sending 1 repo', () => {
    const repos = [REPO1];
    const expected = `${link(REPO1)}`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink: link, repos });
      expect(response).toEqual(expected);
    });
  });

  describe('when sending 3 repos', () => {
    const repos = [REPO1, REPO2, REPO3];
    const expected = `${link(REPO1)}, ${link(REPO2)} and ${link(REPO3)}`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink: link, repos });
      expect(response).toEqual(expected);
    });
  });

  describe('when sending 4 or more repos', () => {
    const repos = [REPO1, REPO2, REPO3, REPO4];
    const expected = `${link(REPO1)}, ${link(REPO2)} and 2 others`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink: link, repos });
      expect(response).toEqual(expected);
    });
  });
});
