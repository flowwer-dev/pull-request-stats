module.exports = (list = {}) => Object
  .values(list)
  .some((value) => value === true);
