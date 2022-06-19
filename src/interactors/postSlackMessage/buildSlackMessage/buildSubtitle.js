const { buildSources } = require('../../../utils');

const getPRText = (pullRequest) => {
  const { url, number } = pullRequest || {};
  if (!url || !number) return '';
  return ` (<${url}|#${number}>)`;
};

const buildGithubLink = (object) => `<https://github.com/${object}|${object}>`;

module.exports = ({
  t,
  org,
  repos,
  pullRequest,
  periodLength,
}) => {
  const sources = buildSources({ buildGithubLink, org, repos });
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${t('table.subtitle', { sources, count: periodLength })}${getPRText(pullRequest)}`,
      },
    },
    {
      type: 'divider',
    },
  ];
};
