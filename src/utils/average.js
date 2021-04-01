const sum = require('./sum');
const divide = require('./divide');

module.exports = (list) => divide(sum(list), list.length);
