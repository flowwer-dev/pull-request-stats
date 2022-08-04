const { getRepoComponents, getRepoOwner, getRepoName } = require('../repos');

const repo = 'org1/repo1';

describe('Utils | repos', () => {
  describe('.getRepoComponents', () => {
    it('return the components of a repo name', () => {
      const expected = ['org1', 'repo1'];
      const result = getRepoComponents(repo);
      expect(result).toEqual(expected);
    });
  });

  describe('.getRepoOwner', () => {
    it('return the name of the repo owner', () => {
      const expected = 'org1';
      const result = getRepoOwner(repo);
      expect(result).toEqual(expected);
    });
  });

  describe('.getRepoName', () => {
    it('return the name of the repo', () => {
      const expected = 'repo1';
      const result = getRepoName(repo);
      expect(result).toEqual(expected);
    });
  });
});
