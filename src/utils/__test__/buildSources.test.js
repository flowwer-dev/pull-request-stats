const buildSources = require('../buildSources');
const { getRepoName } = require('../repos');

const ORG = 'org';
const REPO1 = 'org/repo1';
const REPO2 = 'org/repo2';
const REPO3 = 'org/repo3';
const REPO4 = 'org/repo4';

const buildGithubLink = ({ description, path }) => `[${description}](https://github.com/${path})`;

const linkOrg = (org) => `[${org}](https://github.com/${org})`;

const linkRepo = (repo) => `[${getRepoName(repo)}](https://github.com/${repo})`;

describe('Interactors | .sources', () => {
  describe('when sending and organization', () => {
    const expected = `${linkOrg(ORG)}`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink, org: ORG, repos: null });
      expect(response).toEqual(expected);
    });
  });

  describe('when sending 1 repo', () => {
    const repos = [REPO1];
    const expected = `${linkRepo(REPO1)}`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink, repos });
      expect(response).toEqual(expected);
    });
  });

  describe('when sending 2 repos', () => {
    const repos = [REPO1, REPO2];
    const expected = `${linkRepo(REPO1)} and ${linkRepo(REPO2)}`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink, repos });
      expect(response).toEqual(expected);
    });
  });

  describe('when sending 3 repos', () => {
    const repos = [REPO1, REPO2, REPO3];
    const expectedLength = repos.length;
    const expected = `${linkRepo(REPO1)}, ${linkRepo(REPO2)} and ${linkRepo(REPO3)}`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink, repos });
      expect(response).toEqual(expected);
      expect(repos.length).toEqual(expectedLength);
    });
  });

  describe('when sending 4 or more repos', () => {
    const repos = [REPO1, REPO2, REPO3, REPO4];
    const expected = `${linkRepo(REPO1)}, ${linkRepo(REPO2)} and 2 others`;

    it('builds the message in singular', () => {
      const response = buildSources({ buildGithubLink, repos });
      expect(response).toEqual(expected);
    });
  });
});
