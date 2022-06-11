const JSURL = require('jsurl');

const URL = 'https://app.flowwer.dev/charts/review-time/';
const MAX_URI_LENGTH = 1024;
const CHARS_PER_REVIEW = 16;

const toSeconds = (ms) => Math.round(ms / 1000);

const compressInt = (int) => int.toString(36);

const compressDate = (date) => compressInt(Math.round(date.getTime() / 1000));

const parseReview = ({ submittedAt, timeToReview }) => ({
  d: compressDate(submittedAt),
  t: compressInt(toSeconds(timeToReview)),
});

const buildUri = ({ author, period, reviews }) => {
  const data = JSURL.stringify({
    u: {
      i: `${author.id}`,
      n: author.login,
    },
    p: period,
    r: reviews,
  });

  const uri = `${URL}${data}`;
  const exceededLength = uri.length - MAX_URI_LENGTH;
  if (exceededLength <= 0) return uri;

  // Remove at least one, but trying to guess exactly how many to remove.
  const reviewsToRemove = Math.max(1, Math.ceil(exceededLength / CHARS_PER_REVIEW));
  return buildUri({ author, period, reviews: reviews.slice(reviewsToRemove) });
};

module.exports = (reviewer, period) => {
  const { author, reviews } = reviewer || {};
  const parsedReviews = (reviews || [])
    .map((r) => ({ ...r, submittedAt: new Date(r.submittedAt) }))
    .sort((a, b) => a.submittedAt - b.submittedAt)
    .map(parseReview);

  return buildUri({
    author,
    period,
    reviews: parsedReviews,
  });
};
