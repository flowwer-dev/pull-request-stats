const get = require('lodash.get');

const parseComments = (node) => ({
  ...node,
});

module.exports = ({ node: data }) => ({
  ...data,
  comments: (get(data, 'comments.nodes') || []).map(parseComments),
});
