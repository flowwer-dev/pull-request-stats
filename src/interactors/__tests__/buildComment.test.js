const { t } = require('../../i18n');
const buildComment = require('../buildComment');
const { getRepoName } = require('../../utils');

const TABLE_MOCK = 'TABLE';
const ORG = 'org';
const REPO1 = 'org/repo1';
const REPO2 = 'org/repo2';
const FOOTER = t('table.footer');

const linkOrg = (org) => `[${org}](https://github.com/${org})`;

const linkRepo = (repo) => `[${getRepoName(repo)}](https://github.com/${repo})`;

describe('Interactors | .buildComment', () => {
  const title = '## Pull reviewers stats';

  describe('when GITHUB_SERVER_URL is present', () => {
    const periodLength = 1;
    const message = `Stats of the last day for [${ORG}](https://github.example.io/${ORG}):`;

    it('builds an environment-specific comment using this URL', () => {
      process.env.GITHUB_SERVER_URL = 'https://github.example.io';
      const expected = `${title}\n${message}\n${TABLE_MOCK}\n\n${FOOTER}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK, org: ORG });
      delete process.env.GITHUB_SERVER_URL;
      expect(response).toEqual(expected);
    });
  });

  describe('when period length is 1', () => {
    const periodLength = 1;
    const message = `Stats of the last day for ${linkOrg(ORG)}:`;

    it('builds the message in singular', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}\n\n${FOOTER}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK, org: ORG });
      expect(response).toEqual(expected);
    });
  });

  describe('when period length is more than 1', () => {
    const periodLength = 365;
    const message = `Stats of the last 365 days for ${linkOrg(ORG)}:`;

    it('builds the message in singular', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}\n\n${FOOTER}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK, org: ORG });
      expect(response).toEqual(expected);
    });
  });

  describe('when sending repos', () => {
    const repos = [REPO1, REPO2];
    const periodLength = 1;
    const message = `Stats of the last day for ${linkRepo(REPO1)} and ${linkRepo(REPO2)}:`;

    it('builds the message in singular', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}\n\n${FOOTER}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK, repos });
      expect(response).toEqual(expected);
    });
  });

  describe('when is a sponsor', () => {
    const isSponsor = true;
    const periodLength = 1;
    const message = `Stats of the last day for ${linkOrg(ORG)}:`;

    it('removes the footer', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}`;
      const response = buildComment({
        isSponsor,
        periodLength,
        org: ORG,
        table: TABLE_MOCK,
      });
      expect(response).toEqual(expected);
    });
  });
});
