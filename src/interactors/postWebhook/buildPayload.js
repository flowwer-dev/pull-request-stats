const parseReviewer = ({ contributions, ...other }) => other;

module.exports = ({
  org,
  repos,
  reviewers,
  periodLength,
}) => ({
  reviewers: reviewers.map(parseReviewer),
  options: {
    periodLength,
    organization: org || null,
    repositories: org ? null : repos,
  },
});
