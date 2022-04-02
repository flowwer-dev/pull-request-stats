const getLogins = require('../getLogins');

const org = 'organization';
const repos = ['org1/repo1', 'org1/repo2', 'org2/repo3'];
const repoNames = ['org1', 'org2'];

describe('Interactors | checkSponsorship | .getLogins', () => {
  it('returns empty array when nothing is sent', () => {
    const expected = [];
    const response = getLogins();
    expect(response).toEqual(expected);
  });

  it('returns array with organization name when is sent', () => {
    const expected = [org];
    const response = getLogins({ org });
    expect(response).toEqual(expected);
  });

  it('returns the owners of the repos when there are multiples', () => {
    const expected = [...repoNames];
    const response = getLogins({ repos });
    expect(response).toEqual(expected);
  });

  it('returns both the organization an repo owners', () => {
    const expected = [org, ...repoNames];
    const response = getLogins({ org, repos });
    expect(response).toEqual(expected);
  });
});
