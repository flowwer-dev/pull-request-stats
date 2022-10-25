const { durationToString } = require('../../../utils');

const MEDALS = [
  '🥇',
  '🥈',
  '🥉',
];

const wrapUsername = ({
  avatarUrl,
  login,
}) => ({
  type: 'Column',
  padding: 'None',
  width: 'stretch',
  spacing: 'Small',
  separator: true,
  items: [
    {
      type: 'ColumnSet',
      padding: 'None',
      columns: [
        {
          type: 'Column',
          padding: 'None',
          width: 'auto',
          items: [
            {
              type: 'Image',
              url: avatarUrl,
              altText: login,
              size: 'Small',
              style: 'Person',
              spacing: 'None',
              horizontalAlignment: 'Left',
              width: '32px',
              height: '32px',
            },
          ],
        },
        {
          type: 'Column',
          padding: 'None',
          width: 'stretch',
          verticalContentAlignment: 'Center',
          items: [
            {
              type: 'TextBlock',
              text: login,
              wrap: true,
              horizontalAlignment: 'Left',
              spacing: 'Small',
            },
          ],
        },
      ],
    },
  ],
});

const wrapStat = (text) => ({
  type: 'Column',
  padding: 'None',
  width: 'stretch',
  spacing: 'Small',
  verticalContentAlignment: 'Center',
  items: [
    {
      text,
      type: 'TextBlock',
      wrap: true,
    },
  ],
});

const getUsername = ({ index, reviewer, displayCharts }) => {
  const { login, avatarUrl } = reviewer.author;

  const medal = displayCharts ? MEDALS[index] : null;
  const suffix = medal ? ` ${medal}` : '';

  return wrapUsername({
    avatarUrl,
    login: `${login}${suffix}`,
  });
};

const getStats = ({ reviewer, disableLinks }) => {
  const { stats, urls } = reviewer;
  const timeToReviewStr = durationToString(stats.timeToReview);
  const timeToReview = disableLinks
    ? timeToReviewStr
    : `[${timeToReviewStr}](${urls.timeToReview})`;

  return [
    wrapStat(timeToReview),
    wrapStat(stats.totalReviews),
    wrapStat(stats.totalComments),
  ];
};

module.exports = ({
  index,
  reviewer,
  disableLinks,
  displayCharts,
}) => ({
  type: 'ColumnSet',
  padding: 'Small',
  spacing: 'None',
  separator: true,
  columns: [
    getUsername({ index, reviewer, displayCharts }),
    ...getStats({ reviewer, disableLinks }),
  ],
});
