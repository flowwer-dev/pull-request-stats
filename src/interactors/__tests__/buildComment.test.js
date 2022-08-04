const buildComment = require('../buildComment');
const { getRepoName } = require('../../utils');

const TABLE_MOCK = 'TABLE';
const ORG = 'org';
const REPO1 = 'org/repo1';
const REPO2 = 'org/repo2';

const linkOrg = (org) => `[${org}](https://github.com/${org})`;

const linkRepo = (repo) => `[${getRepoName(repo)}](https://github.com/${repo})`;

describe('Interactors | .buildComment', () => {
  const title = '## Pull reviewers stats';

  describe('when period length is 1', () => {
    const periodLength = 1;
    const message = `Stats of the last day for ${linkOrg(ORG)}:`;

    it('builds the message in singular', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK, org: ORG });
      expect(response).toEqual(expected);
    });
  });

  describe('when period length is more than 1', () => {
    const periodLength = 365;
    const message = `Stats of the last 365 days for ${linkOrg(ORG)}:`;

    it('builds the message in singular', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK, org: ORG });
      expect(response).toEqual(expected);
    });
  });

  describe('when sending repos', () => {
    const repos = [REPO1, REPO2];
    const periodLength = 1;
    const message = `Stats of the last day for ${linkRepo(REPO1)} and ${linkRepo(REPO2)}:`;

    it('builds the message in singular', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK, repos });
      expect(response).toEqual(expected);
    });
  });
});
