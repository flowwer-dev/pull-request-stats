const { TITLES } = require('./constants');
const buildReviewTimeLink = require('./build-review-time-link');
const { durationToString, isNil } = require('../../utils');

const NA = '-';

const MEDAL_ICONS = [0x1F947, 0x1F948, 0x1F949]; /* 🥇🥈🥉 */

const CHART_CHARACTER = '▀';

const CHART_MAX_LENGTH = 10;

const AVATAR_SIZE = {
  SMALL: 20,
  LARGE: 32
};

const noParse = value => value;

const generateChart = (percentage = 0) => {
  const length = Math.round(percentage * CHART_MAX_LENGTH);
  return Array(length).fill(CHART_CHARACTER).join('');
};

const getChartsData = ({ user, index, displayCharts }) => {
  const { contributions } = user;
  const addBr = data => displayCharts ? `<br/>${data}` : '';
  const medal = MEDAL_ICONS[index];

  return {
    username: addBr(medal ? String.fromCodePoint(medal) : ''),
    avgTimeStr: addBr(generateChart(contributions.avgTimeToFirstReview)),
    reviewsStr: addBr(generateChart(contributions.totalReviews)),
    commentsStr: addBr(generateChart(contributions.totalComments))
  };
};

const bold = value => `**${value}**`;

const buildLink = (href, content) => `<a href=${href}>${content}</a>`;

const buildImage = (src, width) => `<img src="${src}" width="${width}">`;

const getImage = ({ user, displayCharts }) => {
  const { avatarUrl, url } = user;
  const avatarSize = displayCharts ? AVATAR_SIZE.LARGE : AVATAR_SIZE.SMALL;

  return buildLink(url, buildImage(avatarUrl, avatarSize));
};

const addReviewsTimeLink = (text, disable, user, period) => {
  return disable ? text : `[${text}](${buildReviewTimeLink({ user, period })})`;
};

module.exports = ({
  users,
  bests,
  displayCharts,
  disableLinks,
  periodLength
}) => {
  const printStat = (stats, statName, parser) => {
    const value = stats[statName];
    if (isNil(value)) return NA;

    const isBest = value === bests[statName];
    const parsed = parser(value);
    return isBest ? bold(parsed) : parsed;
  };

  const buildRow = ({ user, index }) => {
    const { stats, login } = user;
    const chartsData = getChartsData({ user, index, displayCharts });

    const image = getImage({ user, displayCharts });
    const username = `${login}`;
    const avgTimeVal = printStat(stats, 'avgTimeToFirstReview', durationToString);
    const avgTimeStr = addReviewsTimeLink(avgTimeVal, disableLinks, user, periodLength);
    const reviewsStr = printStat(stats, 'totalReviews', noParse);
    const commentsStr = printStat(stats, 'totalComments', noParse);

    return [
      image,
      `${username}${chartsData.username}`,
      `${avgTimeStr}${chartsData.avgTimeStr}`,
      `${reviewsStr}${chartsData.reviewsStr}`,
      `${commentsStr}${chartsData.commentsStr}`
    ];
  };

  const execute = () => {
    const data = users.map((user, index) => buildRow({
      user,
      index,
      bests,
      displayCharts
    }));

    return [
      TITLES,
      ...data
    ];
  };

  return execute();
};
