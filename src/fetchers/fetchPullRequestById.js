const PR_BY_ID_QUERY = `
  query($id: ID!) {
    node(id: $id) {
      ... on PullRequest {
        id
        body
      }
    }
  }
`;

module.exports = (octokit, id) => {
  const variables = { id };
  return octokit
    .graphql(PR_BY_ID_QUERY, variables)
    .catch((error) => {
      const msg = `Error fetching pull requests with id "${id}"`;
      throw new Error(`${msg}. Error: ${error}`);
    });
};
