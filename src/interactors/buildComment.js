const { t } = require('../i18n');
const { buildSources } = require('../utils');

const buildGithubLink = ({ description, path }) => `[${description}](https://github.com/${path})`;

module.exports = ({
  table,
  org,
  repos,
  periodLength,
}) => {
  const sources = buildSources({ buildGithubLink, org, repos });
  const message = t('table.subtitle', { sources, count: periodLength });
  return `## ${t('table.title')}\n${message}:\n${table}`;
};
