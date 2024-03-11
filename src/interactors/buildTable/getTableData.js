const { t } = require('../../i18n');
const { durationToString, isNil } = require('../../utils');

const NA = '-';

const MEDAL_ICONS = [0x1F947, 0x1F948, 0x1F949]; /* 🥇🥈🥉 */

const CHART_CHARACTER = '▀';

const CHART_MAX_LENGTH = 10;

const AVATAR_SIZE = {
  SMALL: 20,
  LARGE: 32,
};

const noParse = (value) => value;

const generateChart = (percentage = 0) => {
  const length = Math.round(percentage * CHART_MAX_LENGTH);
  return Array(length).fill(CHART_CHARACTER).join('');
};

const getChartsData = ({ index, contributions, displayCharts }) => {
  const addBr = (data) => (displayCharts ? `<br/>${data}` : '');
  const medal = MEDAL_ICONS[index];

  return {
    username: addBr(medal ? String.fromCodePoint(medal) : ''),
    timeStr: addBr(generateChart(contributions.timeToReview)),
    reviewsStr: addBr(generateChart(contributions.totalReviews)),
    commentsStr: addBr(generateChart(contributions.totalComments)),
  };
};

const bold = (value) => `**${value}**`;

const buildLink = (href, content) => `<a href="${href}">${content}</a>`;

const buildImage = (src, width) => `<img src="${src}" width="${width}">`;

const getImage = ({ author, displayCharts }) => {
  const { avatarUrl, url } = author;
  const avatarSize = displayCharts ? AVATAR_SIZE.LARGE : AVATAR_SIZE.SMALL;

  return buildLink(url, buildImage(avatarUrl, avatarSize));
};

const addReviewsTimeLink = (text, disable, link) => {
  const addLink = link && !disable;
  return addLink ? `[${text}](${link})` : text;
};

/**
 * round number from 80.2234 to 80.22
 * @param {number} number
 * @returns number
 */
const roundNumber = (number) => Math.round(number * 100) / 100;

/**
 * convert 0 to 1 to a percentage value
 * @param {number} number from 0 to 1
 * @returns percentage string
 */
const getPercentage = (number) => `${roundNumber(number * 100)}%`;

module.exports = ({
  reviewers,
  bests = {},
  disableLinks = false,
  displayCharts = false,
}) => {
  const printStat = (stats, statName, parser) => {
    const value = stats[statName];
    if (isNil(value)) return NA;

    const isBest = value === bests[statName];
    const parsed = parser(value);
    return isBest ? bold(parsed) : parsed;
  };

  const buildRow = ({ reviewer, index }) => {
    const {
      author, stats, contributions, urls,
    } = reviewer;
    const { login } = author || {};
    const chartsData = getChartsData({ index, contributions, displayCharts });

    const avatar = getImage({ author, displayCharts });
    const timeVal = printStat(stats, 'timeToReview', durationToString);
    const timeStr = addReviewsTimeLink(timeVal, disableLinks, urls.timeToReview);
    const commentsStr = printStat(stats, 'totalComments', noParse);
    const reviewsStr = `${printStat(stats, 'totalReviews', noParse)} (${getPercentage(contributions.totalReviews)})`;

    return {
      avatar,
      username: `${login}${chartsData.username}`,
      timeToReview: `${timeStr}${chartsData.timeStr}`,
      totalReviews: `${reviewsStr}${chartsData.reviewsStr}`,
      totalComments: `${commentsStr}${chartsData.commentsStr}`,
    };
  };

  const execute = () => {
    const data = reviewers.map((reviewer, index) => buildRow({
      reviewer,
      index,
      bests,
      displayCharts,
    }));

    const titles = {
      avatar: t('table.columns.avatar'),
      username: t('table.columns.username'),
      timeToReview: t('table.columns.timeToReview'),
      totalReviews: t('table.columns.totalReviews'),
      totalComments: t('table.columns.totalComments'),
    };

    return [
      titles,
      ...data,
    ];
  };

  return execute();
};
