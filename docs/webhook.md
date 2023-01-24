# Posting stats to a Webhook

This action can also send the results to a webhook of your preference. This way, you can send them to [Zapier](https://zapier.com/), [IFTTT](https://ifttt.com/), [Automate.io](https://automate.io/) and more, to take actions based on the results.

Just send a URL in the `webhook` parameter. For example:

```yml
name: Pull Request Stats

on:
  schedule:
    - cron:  '0 16 * * 5'

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@master
        with:
          repositories: 'piedpiper/repo1,piedpiper/repo2'
          webhook: 'https://hooks.zapier.com/hooks/catch/123456/XXXXXXXX'
          # webhook: ${{ secrets.WEBHOOK_URL }} You may want to store this value as a secret.
```

This action will calculate the pull request reviewers' stats for the repos `piedpiper/repo1` and `piedpiper/repo2`, each Friday at 14pm and send the results to the webhook using a `POST` request.

## Webhook content

The webhook payload will include:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `reviewers[]` | `object` | A list of objects containing data about each reviewer. |
| `reviewers[].author` | `object` | Information about the reviewer being described. |
| `reviewers[].author.id` | `string` | Github's unique identified for the reviewer. |
| `reviewers[].author.url` | `string` | The URL to reviewer's profile. |
| `reviewers[].author.login` | `string` | Reviewer's username. |
| `reviewers[].author.avatarUrl` | `string` | The URL to the profile picture of the reviewer. |
| `reviewers[].stats` | `object` | The summarized stats about the reviewer given the current options. |
| `reviewers[].stats.totalReviews` | `integer` | The total number of pull request reviews made. |
| `reviewers[].stats.totalComments` | `integer` | The total number of comment across the pull requests reviewed. |
| `reviewers[].stats.commentsPerReview` | `float` | The number of comments divided by the pull requests reviewed. |
| `reviewers[].stats.timeToReview` | `integer` | The **median** time in milliseconds took to review the pull requests the first time. |
| `reviewers[].urls` | `object` | The set of urls pointing to this action's web version. |
| `reviewers[].urls.timeToReview` | `string` | A URL to the web version of the historic review times of the user. |
| `reviewers[].reviews[]` | `object` | The full list of reviews performed by the user. |
| `reviewers[].reviews[].id` | `integer` | Github's id for the review. |
| `reviewers[].reviews[].pullRequestId` | `integer` | Github's id for the review pull request. |
| `reviewers[].reviews[].submittedAt` | `date` | The date the review was made. |
| `reviewers[].reviews[].commentsCount` | `date` | The total comments made on this review. |
| `reviewers[].reviews[].timeToReview` | `date` | The total time in milliseconds take for the review. That is, the different between the `submittedAt` date and the most recent date between the pull request creation an it's last commit. |
| `options` | `object` | An object containing the specified options to calculate the stats. |
| `options.organization` | `string` | The name of the organization the stats are calculated from. Only when `repositories` is not specified. |
| `options.repositories[]` | `string` | The names of the repositories the stats are calculated from. Only when `organization` is not specified. |
| `options.periodLength` | `integer` | The number of days used to calculate the stats. |

### Example

```json
{
  "reviewers": [
    {
      "author": {
        "id": 1031639,
        "url": "https://github.com/manuelmhtr",
        "login": "manuelmhtr",
        "avatarUrl": "https://avatars.githubusercontent.com/u/1031639"
      },
      "reviews": [
        {
          "submittedAt": "2022-08-23T16:33:59.000Z",
          "id": "PRR_kwDOEwhtk859AhaFB",
          "commentsCount": 0,
          "timeToReview": 861000,
          "pullRequestId": "PR_kwDOEwhtk8491p9nf"
        },
        {
          "submittedAt": "2022-08-25T17:30:33.000Z",
          "id": "PRR_kwDOEwmmhk85Ah1uLoG",
          "commentsCount": 0,
          "timeToReview": 246000,
          "pullRequestId": "PR_kwDOEwmmhk84910CYr"
        }
      ],
      "stats": {
        "totalReviews": 1,
        "totalComments": 0,
        "commentsPerReview": 0,
        "timeToReview": 553500
      },
      "urls": {
        "timeToReview": "https://app.flowwer.dev/charts/review-time/..."
      }
    },
  ],
  "options": {
    "periodLength": 30,
    "organization": "flowwer-dev",
    "repositories": null
  }
}
```

