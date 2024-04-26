const { buildSources } = require('../../../utils');

const getPRText = (pullRequest) => {
  const { url, number } = pullRequest || {};
  if (!url || !number) return '';
  return ` (<${url}|#${number}>)`;
};

const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';
const buildGithubLink = ({ description, path }) => `<${serverUrl}/${path}|${description}>`;

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
