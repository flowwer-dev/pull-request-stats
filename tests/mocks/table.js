module.exports = {
  headers: [
    {
      text: 'User',
    },
    {
      text: 'Total reviews',
    },
    {
      text: 'Time to review',
    },
    {
      text: 'Total comments',
    },
    {
      text: 'Comments per review',
    },
    {
      text: 'Opened PRs',
    },
  ],
  rows: [
    {
      user: {
        link: 'https://github.com/user1',
        image: 'https://avatars.githubusercontent.com/u/user1',
        text: 'user1',
        emoji: 'medal1',
      },
      stats: [
        {
          text: '4',
          link: null,
          chartValue: 0.8,
          bold: true,
        },
        {
          text: '34m',
          link: 'https://app.flowwer.dev/charts/review-time/1',
          chartValue: 0.178,
          bold: false,
        },
        {
          text: '1',
          link: null,
          chartValue: 0.166666,
          bold: false,
        },
        {
          text: '0.25',
          link: null,
          chartValue: 0.04,
          bold: false,
        },
        {
          text: '7',
          link: null,
          chartValue: 0.175,
          bold: false,
        },
      ],
    },
    {
      user: {
        link: 'https://github.com/user2',
        image: 'https://avatars.githubusercontent.com/u/user2',
        text: 'user2',
        emoji: 'medal2',
      },
      stats: [
        {
          text: '1',
          link: null,
          chartValue: 0.2,
          bold: false,
        },
        {
          text: '2h 21m',
          link: 'https://app.flowwer.dev/charts/review-time/2',
          chartValue: 0.736,
          bold: false,
        },
        {
          text: '5',
          link: null,
          chartValue: 0.83333333,
          bold: true,
        },
        {
          text: '5',
          link: null,
          chartValue: 0.8,
          bold: true,
        },
        {
          text: '3',
          link: null,
          chartValue: 0.075,
          bold: false,
        },
      ],
    },
    {
      user: {
        link: 'https://github.com/user3',
        image: 'https://avatars.githubusercontent.com/u/user3',
        text: 'user3',
        emoji: 'medal3',
      },
      stats: [
        {
          text: '0',
          link: null,
          chartValue: 0,
          bold: false,
        },
        {
          text: '17m',
          link: 'https://app.flowwer.dev/charts/review-time/3',
          chartValue: 0.086,
          bold: true,
        },
        {
          text: '0',
          link: null,
          chartValue: 0,
          bold: false,
        },
        {
          text: '1',
          link: null,
          chartValue: 0.16,
          bold: false,
        },
        {
          text: '30',
          link: null,
          chartValue: 0.75,
          bold: true,
        },
      ],
    },
  ],
};
