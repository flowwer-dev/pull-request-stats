const { SORT_KEY, COLUMNS_ORDER } = require('../../constants');

const FIXED_COLUMNS = ['avatar', 'username'];

const hasValue = (str) => !!str;

const getColumnsOrder = (sortBy) => {
  const main = SORT_KEY[sortBy];
  const others = COLUMNS_ORDER.filter((c) => c !== main);
  return [...FIXED_COLUMNS, main, ...others].filter(hasValue);
};

const toArray = (columns) => (row) => columns.map((c) => row[c]);

module.exports = (tableData, sortBy) => {
  const columns = getColumnsOrder(sortBy);
  return tableData.map(toArray(columns));
};
