const humanizeDuration = require('humanize-duration');

const parser = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
});

module.exports = (value) => parser(value, {
  delimiter: ' ',
  spacer: '',
  units: ['d', 'h', 'm'],
  round: true,
});
