const { updatePullRequest, commentOnPullRequest } = require('../fetchers');

const buildBody = (currentBody, content) => {
  if (!currentBody.trim()) return content;
  return `${currentBody}\n\n${content}`;
};

module.exports = ({
  octokit,
  content,
  publishAs,
  currentBody,
  pullRequestId,
}) => {
  if (publishAs === 'NONE') return null;

  if (publishAs === 'DESCRIPTION') {
    return updatePullRequest({
      octokit,
      id: pullRequestId,
      body: buildBody(currentBody || '', content),
    });
  }

  return commentOnPullRequest({
    octokit,
    pullRequestId,
    body: content,
  });
};
