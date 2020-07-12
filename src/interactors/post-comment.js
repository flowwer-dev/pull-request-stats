module.exports = ({
  octokit,
  content,
  repository,
  sha
}) => {
  const [owner, repo] = repository.split('/');

  return octokit.repos.createCommitComment({
    owner,
    repo,
    commit_sha: sha,
    body: content
  });
};
