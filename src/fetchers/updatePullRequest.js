const UPDATE_PR_MUTATION = `
  mutation($id: ID!, $body: String!) {
    updatePullRequest(input: {
      body: $body,
      pullRequestId: $id
    }) {
      pullRequest {
        id
      }
    }
  }
`;

module.exports = ({
  octokit,
  id,
  body,
  event,
}) => {
  const variables = { id, body, event };
  return octokit
    .graphql(UPDATE_PR_MUTATION, variables)
    .catch((error) => {
      const msg = `Error updating pull request with id "${id}"`;
      throw new Error(`${msg}. Error: ${error}`);
    });
};
