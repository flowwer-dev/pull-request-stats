const toMarkdownTable = require('markdown-table');
const getMarkdownContent = require('./getMarkdownContent');

module.exports = ({ table }) => {
  const content = getMarkdownContent({ table });
  return toMarkdownTable(content);
};
