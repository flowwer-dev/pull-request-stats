const { t } = require('../../../i18n');
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
}) => ({
  blocks: [
    ...buildSubtitle({
      t,
      org,
      repos,
      pullRequest,
      periodLength,
    }),

    ...reviewers.reduce(
      (prev, reviewer, index) => [
        ...prev,
        ...buildReviewer({
          t,
          index,
          reviewer,
          disableLinks,
          displayCharts,
        })],
      [],
    ),
  ],
});
