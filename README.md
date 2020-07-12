# Pull Request Stats

Github action to print relevant stats about Pull Request reviewers.

The objective of this action is to:

* Reduce the time taken to review pull requests.
* Encourage the comments quality of reviews.
* Help deciding which people to assign as reviewers.

## Usage

Just add this action to one of your workflow files:

```yml
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@v1
```

### Action inputs

The possible inputs for this action are:

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `token` | `GITHUB_TOKEN` or a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with "repo" permission. | `GITHUB_TOKEN` |
| `repositories` | A comma separated list of github repositories to calculate the stats. | Current repository |
| `period` | The length of the period used to calculate the stats, expressed in days. | `30` |
| `charts` | Whether to add a chart to the start or not. Possible values: `true` or `false`. | `false` |
| `sort-by` | The column used to sort the data. Possible values: `TIME`, `COMMENTS`, `REVIEWS`. | `TIME` |


## Examples

**Minimal config**

Just add this to the file: `.github/workflows/stats.yml`

```yml
name: Pull Request Stats

on: [push]

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@v1
```

### License

AGPLv3
