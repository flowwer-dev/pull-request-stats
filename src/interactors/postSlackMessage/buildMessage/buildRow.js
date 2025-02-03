const EMOJIS_MAP = {
  medal1: ':first_place_medal:', /* 🥇 */
  medal2: ':second_place_medal:', /* 🥈 */
  medal3: ':third_place_medal:', /* 🥉 */
};

const getUsername = ({ text, image, emoji }) => {
  const medal = EMOJIS_MAP[emoji] || null;
  const suffix = medal ? ` ${medal}` : '';

  return {
    type: 'context',
    elements: [
      {
        type: 'image',
        image_url: image,
        alt_text: text,
      },
      {
        emoji: true,
        type: 'plain_text',
        text: `${text}${suffix}`,
      },
    ],
  };
};

const getStats = ({ row, maxStats, statNames }) => {
  const stats = maxStats > 0 ? row.stats.slice(0, maxStats) : row.stats;
  const fields = stats.map(({ text, link }, index) => {
    const value = link ? `<${link}|${text}>` : text;
    return {
      type: 'mrkdwn',
      text: `*${statNames[index]}:* ${value}`,
    };
  });

  return {
    type: 'section',
    fields,
  };
};

const getDivider = () => ({
  type: 'divider',
});

module.exports = ({
  row,
  maxStats,
  statNames,
}) => [
  getUsername(row.user),
  getStats({ row, maxStats, statNames }),
  getDivider(),
];
