const { buildSources } = require('../../../utils');
const { getGithubServerUrl } = require('../../../config');

const getPRText = (pullRequest) => {
  const { url, number } = pullRequest || {};
  if (!url || !number) return '';
  return ` ([#${number}](${url}))`;
};

const buildGithubLink = ({ description, path }) => `[${description}](${getGithubServerUrl()}/${path})`;

module.exports = ({
  t,
  org,
  repos,
  pullRequest,
  periodLength,
}) => {
  const sources = buildSources({ buildGithubLink, org, repos });
  return {
    type: 'Container',
    padding: 'Small',
    items: [
      {
        type: 'TextBlock',
        weight: 'Lighter',
        wrap: true,
        text: `${t('table.subtitle', { sources, count: periodLength })}${getPRText(pullRequest)}`,
      },
    ],
  };
};
