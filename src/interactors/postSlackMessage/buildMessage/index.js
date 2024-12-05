const { t } = require('../../../i18n');
const buildSubtitle = require('./buildSubtitle');
const buildRow = require('./buildRow');

const getStatNames = (headers) => headers.slice(1).map(({ text }) => text);

module.exports = ({
  org,
  repos,
  table,
  pullRequest,
  periodLength,
}) => ({
  blocks: [
    ...buildSubtitle({
      t,
      org,
      repos,
      pullRequest,
      periodLength,
    }),

    ...table.rows.reduce(
      (prev, row) => [
        ...prev,
        ...buildRow({ row, statNames: getStatNames(table.headers) })],
      [],
    ),
  ],
});
