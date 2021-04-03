const JSURL = require('jsurl');

const URL = 'https://app.flowwer.dev/charts/review-time/';

const toSeconds = (ms) => Math.round(ms / 1000);

const compressInt = (int) => int.toString(36);

const compressDate = (date) => compressInt(Math.round(date.getTime() / 1000));

const parseReview = ({ submittedAt, timeToReview }) => ({
  d: compressDate(new Date(submittedAt)),
  t: compressInt(toSeconds(timeToReview)),
});

module.exports = (reviewer, period) => {
  const { author, reviews } = reviewer || {};
  const data = JSURL.stringify({
    u: {
      i: `${author.id}`,
      n: author.login,
    },
    p: period,
    r: (reviews || []).map(parseReview),
  });

  return `${URL}${data}`;
};
