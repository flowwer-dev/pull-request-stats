const { isNil } = require('../../utils');

const EMOJIS_MAP = {
  medal1: String.fromCodePoint(0x1F947), /* 🥇 */
  medal2: String.fromCodePoint(0x1F948), /* 🥈 */
  medal3: String.fromCodePoint(0x1F949), /* 🥉 */
};

const AVATAR_SIZE = {
  SMALL: 20,
  LARGE: 32,
};

const NEW_LINE = '<br/>';

const CHART_CHARACTER = '▀';

const CHART_MAX_LENGTH = 10;

const generateChart = (percentage = 0) => {
  const length = Math.round(percentage * CHART_MAX_LENGTH);
  const chart = Array(length).fill(CHART_CHARACTER).join('');
  return `${NEW_LINE}${chart}`;
};

const buildLink = (href, content) => `<a href="${href}">${content}</a>`;

const buildImage = (src, width) => `<img src="${src}" width="${width}">`;

const markdownBold = (value) => `**${value}**`;

const markdownLink = (text, link) => `[${text}](${link})`;

const buildHeader = ({ text }) => (text);

const buildHeaders = ({ headers }) => [
  '', // Empty header for the avatar
  ...headers.map(buildHeader),
];

const buildAvatar = ({ image, link, avatarSize }) => buildLink(link, buildImage(image, avatarSize));

const buildUsername = ({ text, emoji }) => (emoji ? `${text}${NEW_LINE}${EMOJIS_MAP[emoji]}` : text);

const buildStat = ({
  text,
  link,
  chartValue,
  bold,
}) => {
  const bolded = bold ? markdownBold(text) : text;
  const linked = link ? markdownLink(bolded, link) : bolded;
  const chart = isNil(chartValue) ? '' : generateChart(chartValue);
  return `${linked}${chart}`;
};

const buildRows = ({ table, avatarSize }) => table.rows.map((row) => [
  buildAvatar({ ...row.user, avatarSize }),
  buildUsername(row.user),
  ...row.stats.map((stat) => buildStat(stat)),
]);

module.exports = ({
  table,
}) => {
  const firstUser = table.rows[0].user;
  const avatarSize = firstUser.emoji ? AVATAR_SIZE.LARGE : AVATAR_SIZE.SMALL;

  const headers = buildHeaders(table);
  const rows = buildRows({ table, avatarSize });

  return [
    headers,
    ...rows,
  ];
};
