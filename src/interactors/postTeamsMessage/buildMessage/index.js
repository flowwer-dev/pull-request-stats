const { t } = require('../../../i18n');
const buildHeaders = require('./buildHeaders');
const buildSubtitle = require('./buildSubtitle');
const buildReviewer = require('./buildReviewer');

module.exports = ({
  org,
  repos,
  reviewers,
  pullRequest,
  periodLength,
  disableLinks,
  displayCharts,
}) => ([
  buildSubtitle({
    t,
    org,
    repos,
    pullRequest,
    periodLength,
  }),

  buildHeaders({ t }),

  ...reviewers.map((reviewer, index) => buildReviewer({
    index,
    reviewer,
    disableLinks,
    displayCharts,
  })),
]);
