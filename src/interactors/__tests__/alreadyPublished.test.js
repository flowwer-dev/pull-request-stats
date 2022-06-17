const alreadyPublished = require('../alreadyPublished');

const STATS = '## Pull reviewers stats\n|stats|table|';
const OTHER_CONTENT = '## Other pull request content';

describe('Interactors | .alreadyPublished', () => {
  it('returns false when input is falsy', () => {
    expect(alreadyPublished(null)).toBe(false);
  });

  it('returns false when body is empty', () => {
    const body = '';
    const pullRequest = { body };
    expect(alreadyPublished(pullRequest)).toBe(false);
  });

  it('returns false when body contains other stuff', () => {
    const body = OTHER_CONTENT;
    const pullRequest = { body };
    expect(alreadyPublished(pullRequest)).toBe(false);
  });

  it('returns true when body contains stats only', () => {
    const body = STATS;
    const pullRequest = { body };
    expect(alreadyPublished(pullRequest)).toBe(true);
  });

  it('returns true when body contains other stuff and stats', () => {
    const body = `${OTHER_CONTENT}\n${STATS}`;
    const pullRequest = { body };
    expect(alreadyPublished(pullRequest)).toBe(true);
  });

  it('returns true when a comment contains stats', () => {
    const comments = [
      {
        body: STATS,
      },
    ];
    const pullRequest = { body: '', comments };
    expect(alreadyPublished(pullRequest)).toBe(true);
  });
});
