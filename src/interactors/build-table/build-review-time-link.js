const JSURL = require('jsurl');

const URL = 'https://app.flowwer.dev/charts/review-time/';

const toSeconds = (ms) => Math.round(ms / 1000);

const compressInt = (int) => int.toString(36);

const compressDate = (date) => compressInt(Math.round(date.getTime() / 1000));

const parseReview = ({ date, time }) => ({
  d: compressDate(date),
  t: compressInt(toSeconds(time))
});

module.exports = ({ user, period }) => {
  const data = JSURL.stringify({
    u: {
      i: `${user.id}`,
      n: user.login
    },
    p: period,
    r: (user.stats.reviews || []).map(parseReview)
  });

  return `${URL}${data}`;
};
