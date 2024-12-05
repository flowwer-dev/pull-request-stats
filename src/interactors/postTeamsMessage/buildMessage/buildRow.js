const EMOJIS_MAP = {
  medal1: '🥇',
  medal2: '🥈',
  medal3: '🥉',
};

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

const getUsername = ({ image, text, emoji }) => {
  const medal = EMOJIS_MAP[emoji] || null;
  const suffix = medal ? ` ${medal}` : '';

  return wrapUsername({
    avatarUrl: image,
    login: `${text}${suffix}`,
  });
};

const getStats = (stats) => stats.map(({ link, text }) => {
  const content = link ? `[${text}](${link})` : text;
  return wrapStat(content);
});

module.exports = ({ row }) => ({
  type: 'ColumnSet',
  padding: 'Small',
  spacing: 'None',
  separator: true,
  columns: [
    getUsername(row.user),
    ...getStats(row.stats),
  ],
});
