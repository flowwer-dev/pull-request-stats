const getPRText = (pullRequest) => {
  const { url, number } = pullRequest || {};
  if (!url || !number) return '';
  return ` (<${url}|#${number}>)`;
};

module.exports = ({ t, pullRequest, periodLength }) => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `${t('table.subtitle', { count: periodLength })}${getPRText(pullRequest)}`,
    },
  },
  {
    type: 'divider',
  },
];
