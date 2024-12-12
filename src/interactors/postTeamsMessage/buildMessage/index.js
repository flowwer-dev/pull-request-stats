const { t } = require('../../../i18n');
const buildHeaders = require('./buildHeaders');
const buildSubtitle = require('./buildSubtitle');
const buildRow = require('./buildRow');

module.exports = ({
  org,
  repos,
  table,
  pullRequest,
  periodLength,
}) => ([
  buildSubtitle({
    t,
    org,
    repos,
    pullRequest,
    periodLength,
  }),

  buildHeaders(table.headers),

  ...table.rows.map((row) => buildRow({ row })),
]);
