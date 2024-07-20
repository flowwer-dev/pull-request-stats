const { t } = require('../i18n');
const { buildSources } = require('../utils');
const { getGithubServerUrl } = require('../config');

const buildGithubLink = ({ description, path }) => `[${description}](${getGithubServerUrl()}/${path})`;

module.exports = ({
  table,
  org,
  repos,
  isSponsor,
  periodLength,
}) => {
  const sources = buildSources({ buildGithubLink, org, repos });
  const message = t('table.subtitle', { sources, count: periodLength });
  const footer = isSponsor ? '' : `\n\n${t('table.footer')}`;
  return `## ${t('table.title')}\n${message}:\n${table}${footer}`;
};
