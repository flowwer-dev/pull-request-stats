# Pull Request Stats
Github action to print relevant stats about Pull Request reviewers.

The objective of this action is to:

* Reduce the time taken to review the pull requests.
* Encourage quality on reviews.
* Help to decide which people to assign as reviewers.

Running this action will add a section at the bottom of your pull requests description.

## Usage

Just add this action to one of your [workflow files](https://docs.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow):

```yml
      - name: Run pull request stats
        uses: Sportsbet-Internal/pull-request-stats@master
```

### Action inputs

The possible inputs for this action are:

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `token` | A [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with `repo` permissions. Required to calculate stats for an organization or multiple repos. | `GITHUB_TOKEN` |
| `repositories` | A comma separated list of github repositories to calculate the stats, eg. `username/repo1,username/repo2`. When specifying other repo(s) **it is mandatory to pass a Personal Access Token** in the `token` parameter.| Current repository |
| `organization` | If you prefer, you may specify the name of your organization to calculate the stats across all of its repos. When specifying an organization **it is mandatory to pass a Personal Access Token** in the `token` parameter. | `null`|
| `period` | The length of the period used to calculate the stats, expressed in days. | `30` |
| `limit` | The maximum number of rows to display in the table. A value of `0` means unlimited. |`0`|
| `charts` | Whether to add a chart to the start or not. Possible values: `true` or `false`. | `false` |
| `disable-links` | If `true`, removes the links to the detailed charts. Possible values: `true` or `false`. | `false` |
| `sort-by` | The column used to sort the data. Possible values: `REVIEWS`, `TIME`, `COMMENTS`. | `REVIEWS` |
| `publish-as` | Where to publish the results. Possible values: as a `COMMENT`, on the pull request `DESCRIPTION`. | `COMMENT` |
| `telemetry` | Indicates if the action is allowed to send monitoring data to the developer. This data is [minimal](/src/services/telemetry/sendStart.js) and helps me improve this action.
| `slack-webhook` | **🔥 New.** A Slack webhook URL to post resulting stats. See [full documentation here](/docs/slack.md).  |`null`|
| `slack-channel` | The Slack channel where stats will be posted. Include the `#` character (eg. `#mychannel`). Required when a `slack-webhook` is configured. |`null`|
| `teams-webhook` | **🔥 New.** A Microsoft Teams webhook URL to post resulting stats. See [full documentation here](/docs/teams.md).  |`null`|
| `webhook` | **🔥 New.** A webhook URL to send the resulting stats as JSON (integrate with Zapier, IFTTT...). See [full documentation here](/docs/webhook.md). |`null`|


## Examples

**Minimal config**

Add this to the file `.github/workflows/stats.yml` in your repo:

```yml
name: Pull Request Stats

on:
  pull_request:
    types: [opened]

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: Sportsbet-Internal/pull-request-stats@master
```

This config will:

* Calculate the reviewer stats for the current repo in the lasts 30 days
* Add links to the historial data
* Sort results by the "total reviews" column by default

**Visual config**

Add this to the file `.github/workflows/stats.yml`:

```yml
name: Pull Request Stats

on:
  pull_request:
    types: [opened]

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: Sportsbet-Internal/pull-request-stats@master
        with:
          token: ${{ secrets.ADD_A_PERSONAL_ACCESS_TOKEN }}
          organization: 'Sportsbet-Internal'
          period: 7
          charts: true
          disable-links: true
          sort-by: 'COMMENTS'
```

This config will:

* Calculate the reviewer stats for all the repos in the "piedpiper" organization in the lasts 7 days
* Display charts for the metrics
* Remove the links to detailed charts
* Sort results by the "comments" column

## Stats

The stats are calculated as following:

* **Time to review:** It is the time taken by a reviewer from the _Pull Request publication_ or the last _Commit push_ (whatever happens last) to the first time the pull request is reviewed.
* **Time to review:** It is the **median** of the _times to review_ of all Pull Requests reviewed by a person in the period.
* **Total reviews:** It is the count of all Pull Requests reviewed by a person in the period.
* **Total comments:** It is the count of all the comments while reviewing other user's Pull Requests in the period (comments in own PRs don't count).

## Integrations 🔌

Check the guide for the tool you want to integrate:

* [Slack](/docs/slack.md)
* [Microsoft Teams](/docs/teams.md)
* [Webhooks](/docs/webhook.md)

## Troubleshooting

<details>
  <summary>The action is printing an empty table.</summary>

  1. Make sure the repositories have pull request reviews during the configured `period`.
  2. When specifying `repositories` or `organization` paramaters, a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) is required in the `token` parameter.
  3. If providing a Personal Access Token, make sure it has the `repo` permission for the projects you want.
</details>

<details>
  <summary>I get the error "Error commenting on the pull request...".</summary>

  This error happens when the action's permissions are configured as `read` by the organization. To fix it, overwrite them by adding a [`permissions`](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs) configuration in the workflow file. The minimum required permissions are `contents: read` and `pull-requests: write`:

  ```yml
  jobs:
  stats:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - name: Run pull request stats
        uses: Sportsbet-Internal/pull-request-stats@master
  ```
</details>

