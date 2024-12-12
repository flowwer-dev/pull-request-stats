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

module.exports = (headers) => ({
  type: 'ColumnSet',
  padding: 'Small',
  horizontalAlignment: 'Left',
  style: 'emphasis',
  spacing: 'Small',
  columns: headers.map(({ text }) => wrapHeader(text)),
});
