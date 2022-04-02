const SPONSORED_ACCOUNT = 'manuelmhtr';

const buildQuery = (logins) => {
  const fields = logins.map(
    (login, index) => `sponsor${index + 1}: isSponsoredBy(accountLogin: "${login}")`,
  ).join('\n');

  return `{
    user(
      login: "${SPONSORED_ACCOUNT}"
    ) {
      ${fields}
    }
  }`;
};

module.exports = ({
  octokit,
  logins,
}) => octokit
  .graphql(buildQuery(logins))
  .catch((error) => {
    const msg = `Error fetching sponsorships with logins: "${JSON.stringify(logins)}"`;
    throw new Error(`${msg}. Error: ${error}`);
  });
