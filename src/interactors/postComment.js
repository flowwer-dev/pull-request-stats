const { updatePullRequest } = require('../fetchers');

const buildBody = (currentBody, content) => {
  if (!currentBody.trim()) return content;
  return `${currentBody}\n${content}`;
};

module.exports = ({
  octokit,
  content,
  currentBody,
  pullRequestId,
}) => updatePullRequest({
  octokit,
  id: pullRequestId,
  body: buildBody(currentBody || '', content),
});
