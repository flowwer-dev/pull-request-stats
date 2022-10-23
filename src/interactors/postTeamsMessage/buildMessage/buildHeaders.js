const wrapHeader = (text) => ({
  type: 'Column',
  padding: 'None',
  width: 'stretch',
  verticalContentAlignment: 'Center',
  items: [
    {
      text,
      type: 'TextBlock',
      wrap: true,
      weight: 'Bolder',
    },
  ],
});

module.exports = ({ t }) => ({
  type: 'ColumnSet',
  padding: 'Small',
  horizontalAlignment: 'Left',
  style: 'emphasis',
  spacing: 'Small',
  columns: [
    wrapHeader(t('table.columns.username')),
    wrapHeader(t('table.columns.timeToReview')),
    wrapHeader(t('table.columns.totalReviews')),
    wrapHeader(t('table.columns.totalComments')),
  ],
});
