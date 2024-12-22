module.exports = [
  {
    userId: '1234',
    reviews: [
      {
        submittedAt: '2021-03-12T17:41:18.000Z',
        id: 611016770,
        commentsCount: 0,
        timeToReview: 363000,
        pullRequestId: 591820759,
      },
      {
        submittedAt: '2021-03-12T22:13:17.000Z',
        id: 611189051,
        commentsCount: 0,
        timeToReview: 4674000,
        pullRequestId: 591932158,
      },
      {
        submittedAt: '2021-03-10T22:54:45.000Z',
        id: 609241758,
        commentsCount: 0,
        timeToReview: 292000,
        pullRequestId: 590242592,
      },
      {
        submittedAt: '2021-03-29T18:25:17.000Z',
        id: 623480404,
        commentsCount: 1,
        timeToReview: 3742000,
        pullRequestId: 602948274,
      },
    ],
    stats: {
      totalReviews: 4,
      totalComments: 1,
      timeToReview: 2052500,
      commentsPerReview: 0.25,
      reviewedAdditions: 1_000,
      reviewedDeletions: 500,
      reviewedLines: 1_500,
    },
  },
  {
    userId: '5678',
    reviews: [
      {
        submittedAt: '2021-03-15T12:14:00.000Z',
        id: 611015896,
        commentsCount: 5,
        timeToReview: 8465000,
        pullRequestId: 5918228571,
      },
    ],
    stats: {
      totalReviews: 1,
      totalComments: 5,
      timeToReview: 8465000,
      commentsPerReview: 5,
      reviewedAdditions: 5_000,
      reviewedDeletions: 4_500,
      reviewedLines: 9_500,
    },
  },
];
