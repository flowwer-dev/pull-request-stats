const average = require('./average');
const buildSources = require('./buildSources');
const divide = require('./divide');
const durationToString = require('./durationToString');
const isNil = require('./isNil');
const median = require('./median');
const repos = require('./repos');
const subtractDaysToDate = require('./subtractDaysToDate');
const sum = require('./sum');

module.exports = {
  ...repos,
  average,
  buildSources,
  divide,
  durationToString,
  isNil,
  median,
  subtractDaysToDate,
  sum,
};
