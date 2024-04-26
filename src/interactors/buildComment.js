const { t } = require('../i18n');
const { buildSources } = require('../utils');

const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';
const buildGithubLink = ({ description, path }) => `[${description}](${serverUrl}/${path})`;

module.exports = ({
  table,
  org,
  repos,
  isSponsor,
  periodLength,
}) => {
  const sources = buildSources({ buildGithubLink, org, repos });
  const message = t('table.subtitle', { sources, count: periodLength });
  const footer = isSponsor ? '' : `\n${t('table.footer')}`;
  return `## ${t('table.title')}\n${message}:\n${table}${footer}`;
};
