# Posting Stats to a Webhook

> **🔥 This integration does not require sponsorship. Enjoy!**

This action allows you to send results to a webhook of your choice. This means you can integrate with platforms like [Zapier](https://zapier.com/), [IFTTT](https://ifttt.com/), [Automate.io](https://automate.io/), and more, to perform actions based on the results.

## How to Use the Webhook Parameter

To use this feature, provide a URL in the `webhook` parameter. For example:

```yml
name: Pull Request Stats

on:
  schedule:
    - cron: '0 16 * * 5'

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@main
        with:
          repositories: 'piedpiper/repo1,piedpiper/repo2'
          webhook: 'https://hooks.zapier.com/hooks/catch/123456/XXXXXXXX'
          # webhook: ${{ secrets.WEBHOOK_URL }} You may want to store this value as a secret.
```

This configuration calculates pull request stats for the repositories `piedpiper/repo1` and `piedpiper/repo2` every Friday at 16:00 (UTC). The results are sent to the specified webhook URL via a `POST` request.

## Webhook Payload Structure

The webhook payload includes detailed information:

### Parameters

| Parameter                           | Type      | Description                                                                  |
| ----------------------------------- | --------- | ---------------------------------------------------------------------------- |
| `entries[]`                         | `object`  | A list of objects containing data about each user contributing to the stats. |
| `entries[].user`                    | `object`  | Information about the user.                                                  |
| `entries[].user.id`                 | `string`  | GitHub's unique identifier for the user.                                     |
| `entries[].user.url`                | `string`  | The URL to the user's GitHub profile.                                        |
| `entries[].user.login`              | `string`  | GitHub username.                                                             |
| `entries[].user.avatarUrl`          | `string`  | URL to the user's profile picture.                                           |
| `entries[].stats`                   | `object`  | Summarized stats for the user based on the selected options.                 |
| `entries[].contributions`           | `object`  | Represents the proportion of a specific stat attributed to the user. For example, if there are 50 total reviews and the user performed 10, their contribution is `0.2`. |
| `entries[].urls`                    | `object`  | URLs pointing to this action's web-based views.                              |
| `entries[].urls.timeToReview`       | `string`  | URL to the user's historic review times.                                     |
| `entries[].reviews[]`               | `object`  | List of reviews performed by the user.                                       |
| `entries[].reviews[].id`            | `integer` | GitHub ID for the review.                                                    |
| `entries[].reviews[].pullRequestId` | `integer` | GitHub ID for the reviewed pull request.                                     |
| `entries[].reviews[].submittedAt`   | `date`    | Date when the review was submitted.                                          |
| `entries[].reviews[].commentsCount` | `integer` | Number of comments made in the review.                                       |
| `entries[].reviews[].timeToReview`  | `integer` | Time in milliseconds taken to complete the review.                           |
| `options`                           | `object`  | Options used to calculate the stats.                                         |
| `options.organization`              | `string`  | Name of the organization analyzed (if repositories are not specified).       |
| `options.repositories[]`            | `string`  | Names of the analyzed repositories (if the organization is not specified).   |
| `options.periodLength`              | `integer` | Number of days used to calculate the stats.                                  |
| `options.pullRequestId`             | `string`  | GitHub ID for the pull request that triggered the action, if applicable.     |

### Example Payload

```json
{
  "entries": [
    {
      "user": {
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
      },
      "contributions": {
        "totalReviews": 0.3,
        "totalComments": 0,
        "commentsPerReview": 0.5,
        "timeToReview": 0.1
      }
    }
  ],
  "options": {
    "periodLength": 30,
    "organization": "flowwer-dev",
    "repositories": null,
    "pullRequestId": "PR_Mhspq3784A10asbbs"
  }
}
```

## What's Next?

We’re building more integrations for this action! [Share your ideas](https://github.com/flowwer-dev/pull-request-stats/discussions/new) about the integrations you'd like to see and how you plan to use webhooks.

Support this project by becoming a [sponsor](https://github.com/sponsors/manuelmhtr). 💙

