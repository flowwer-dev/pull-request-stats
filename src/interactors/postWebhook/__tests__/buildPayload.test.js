const buildPayload = require('../buildPayload');

describe('Interactors | .postWebhook | .buildPayload', () => {
  const org = 'ORGANIZATION';
  const repos = 'REPOSITORIES';
  const periodLength = 'PERIOD_LENGTH';
  const reviewers = [
    { some: 'properties' },
  ];

  it('returns a formatted object', () => {
    const expectedResponse = {
      reviewers,
      options: {
        periodLength,
        organization: null,
        repositories: repos,
      },
    };
    const response = buildPayload({
      repos,
      reviewers,
      periodLength,
    });
    expect(response).toEqual(expectedResponse);
  });

  it('when both org and repos are sent, repos is ignored', () => {
    const expectedResponse = {
      reviewers,
      options: {
        periodLength,
        organization: org,
        repositories: null,
      },
    };
    const response = buildPayload({
      org,
      repos,
      reviewers,
      periodLength,
    });
    expect(response).toEqual(expectedResponse);
  });

  it('removes "contributions" from reviewers', () => {
    const response = buildPayload({
      org,
      repos,
      periodLength,
      reviewers: [
        {
          contributions: 'CONTRIBUTIONS',
          other: 'properties',
        },
      ],
    });
    expect(response.reviewers.length).toEqual(1);
    response.reviewers.forEach((reviewer) => {
      expect(reviewer).not.toHaveProperty('contributions');
    });
  });
});
