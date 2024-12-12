const { t } = require('../../i18n');
const { STATS } = require('../../config/stats');
const { isNil } = require('../../utils');

const NA = '-';

const EMOJIS = [
  'medal1',
  'medal2',
  'medal3',
];

const buildUser = ({ index, user, displayCharts }) => ({
  link: user.url,
  image: user.avatarUrl,
  text: user.login,
  emoji: displayCharts ? (EMOJIS[index] || null) : null,
});

const buildHeaders = ({ mainStats }) => {
  const usernameHeader = { text: t('table.columns.username') };
  const statsHeaders = mainStats.map((statName) => ({ text: t(`table.columns.${statName}`) }));
  return [usernameHeader, ...statsHeaders];
};

module.exports = ({
  mainStats,
  bests,
  entries,
  disableLinks = false,
  displayCharts = false,
}) => {
  const buildStats = ({ entry }) => mainStats.map((key) => {
    const statConfig = STATS[key];
    const value = entry.stats[key];
    const link = disableLinks ? null : (entry.urls[key] || null);
    const text = isNil(value) ? NA : statConfig.parser(value);
    const chartValue = displayCharts ? entry.contributions[key] : null;

    return {
      text,
      link,
      chartValue,
      bold: bests[key] === value,
    };
  });

  const buildRow = ({ entry, index }) => {
    const user = buildUser({ displayCharts, index, user: entry.user });
    const stats = buildStats({ entry });

    return {
      user,
      stats,
    };
  };

  const execute = () => {
    const headers = buildHeaders({ mainStats });
    const rows = entries.map((entry, index) => buildRow({
      entry,
      index,
    }));

    return {
      headers,
      rows,
    };
  };

  return execute();
};
