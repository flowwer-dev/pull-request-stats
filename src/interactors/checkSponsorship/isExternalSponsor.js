// A list of organizations which are sponsoring this project outside Github 💙
const externalSponsors = new Set([
  'yotepresto-com',
  'zenfi',
]);

module.exports = (logins) => [...(logins || [])]
  .some((login) => externalSponsors.has(login));
