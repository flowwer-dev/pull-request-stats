const { t } = require('../../../../i18n');
const { getRepoName } = require('../../../../utils');
const buildSubtitle = require('../buildSubtitle');

const ORG = 'org';
const REPO1 = 'org/repo1';
const REPO2 = 'org/repo2';

const periodLength = 10;
const pullRequest = {
  number: 13,
  url: 'https://github.com/manuelmhtr/pulls/13',
};

const linkOrg = (org) => `[${org}](https://github.com/${org})`;

const linkRepo = (repo) => `[${getRepoName(repo)}](https://github.com/${repo})`;

const wrapText = (text) => ({
  type: 'Container',
  padding: 'Small',
  items: [
    {
      text,
      type: 'TextBlock',
      weight: 'Lighter',
      wrap: true,
    },
  ],
});

describe('Interactors | postTeamsMessage | .buildSubtitle', () => {
  const baseParams = {
    t,
    periodLength,
    org: ORG,
  };

  describe('when GITHUB_SERVER_URL is present', () => {
    it('returns a subtitle with custom github server URL', () => {
      process.env.GITHUB_SERVER_URL = 'https://github.example.io';
      const pullRequestWithCustomDomain = {
        number: 13,
        url: 'https://github.example.io/manuelmhtr/pulls/13',
      };
      const linkOrgWithCustomDomain = (org) => `[${org}](https://github.example.io/${org})`;
      const response = buildSubtitle({ ...baseParams, pullRequest: pullRequestWithCustomDomain });
      const prLinkWithCustomDomain = `([#${pullRequestWithCustomDomain.number}](${pullRequestWithCustomDomain.url}))`;
      const sources = linkOrgWithCustomDomain(ORG);
      const text = `${t('table.subtitle', { sources, count: periodLength })} ${prLinkWithCustomDomain}`;
      delete process.env.GITHUB_SERVER_URL;
      expect(response).toEqual(wrapText(text));
    });
  });

  describe('when sending a pull request', () => {
    it('returns a subtitle with no pull request data', () => {
      const response = buildSubtitle({ ...baseParams, pullRequest });
      const prLink = `([#${pullRequest.number}](${pullRequest.url}))`;
      const sources = linkOrg(ORG);
      const text = `${t('table.subtitle', { sources, count: periodLength })} ${prLink}`;
      expect(response).toEqual(wrapText(text));
    });
  });

  describe('when not sending a pull request', () => {
    it('returns a subtitle with no pull request data', () => {
      const response = buildSubtitle({ ...baseParams, pullRequest: null });
      const sources = linkOrg(ORG);
      const text = `${t('table.subtitle', { sources, count: periodLength })}`;
      expect(response).toEqual(wrapText(text));
    });
  });

  describe('when sending multiple repos', () => {
    it('returns a subtitle with no pull request data', () => {
      const repos = [REPO1, REPO2];
      const response = buildSubtitle({ ...baseParams, org: null, repos });
      const sources = `${linkRepo(REPO1)} and ${linkRepo(REPO2)}`;
      const text = `${t('table.subtitle', { sources, count: periodLength })}`;
      expect(response).toEqual(wrapText(text));
    });
  });
});
