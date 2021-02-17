const PRS_QUERY = `
query($query: String!, $limit: Integer!, $after: String) {
  search(query: $query, first: $limit, after: $after, type: ISSUE) {
    edges {
      cursor
      node {
        ... on PullRequest {
          publishedAt
          author { ...ActorFragment }
          reviews(first: 100) {
            nodes {
              submittedAt
              commit { pushedDate }
              comments { totalCount }
              author { ...ActorFragment }
            }
          }
        }
      }
    }
  }
}

fragment ActorFragment on Actor {
  url
  login
  avatarUrl
}
`;

module.exports = ({
  octokit,
  query,
  after,
  limit
}) => {
  const variables = { query, after, limit };
  return octokit
    .graphql(PRS_QUERY, variables)
    .catch(error => {
      const msg = `Error fetching pull requests with variables "${JSON.stringify(variables)}"`;
      throw new Error(`${msg}. Error: ${error}`);
    });
};
