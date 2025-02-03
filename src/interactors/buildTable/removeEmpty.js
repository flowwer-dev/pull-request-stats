const removeEmpty = (entries, mainStats) => entries
  .filter((entry) => mainStats.some((stat) => !!entry.stats[stat]));

module.exports = removeEmpty;
