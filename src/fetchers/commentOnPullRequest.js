const COMMENT_MUTATION = `
  mutation($input: AddCommentInput!) {
    addComment(input: $input) {
      clientMutationId
    }
  }
`;

module.exports = ({
  octokit,
  body,
  pullRequestId: subjectId,
}) => {
  const variables = { input: { body, subjectId } };
  return octokit
    .graphql(COMMENT_MUTATION, variables)
    .catch((error) => {
      const msg = `Error commenting on the pull request, with variables "${JSON.stringify(variables)}"`;
      throw new Error(`${msg}. Error: ${error}`);
    });
};
