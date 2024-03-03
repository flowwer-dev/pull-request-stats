const sendSuccess = require('../sendSuccess');

describe('sendSuccess', () => {
  const track = jest.fn();
  const tracker = { track };
  const timeMs = 1234567;
  const pullRequest = {
    author: {
      login: 'author',
    },
  };
  const reviewers = [
    { author: { login: 'reviewer1' } },
    { author: { login: 'reviewer2' } },
  ];

  const setup = () => sendSuccess({
    timeMs,
    tracker,
    pullRequest,
    reviewers,
  });

  beforeEach(() => {
    track.mockClear();
  });

  it('send the timing parameters correctly', () => {
    setup();
    expect(track).toHaveBeenCalledWith('success', expect.objectContaining({
      timeMs,
      timeSec: 1234,
      timeMin: 20,
    }));
  });

  it('sends the PR author correctly', () => {
    setup();
    expect(track).toHaveBeenCalledWith('success', expect.objectContaining({
      prAuthor: 'author',
    }));
  });

  it('sends the reviewers correctly', () => {
    setup();
    expect(track).toHaveBeenCalledWith('success', expect.objectContaining({
      reviewers: ['reviewer1', 'reviewer2'],
      reviewersCount: 2,
    }));
  });
});
