# Pull Request Stats

[![CI](https://github.com/flowwer-dev/pull-request-stats/workflows/Tests/badge.svg)](https://github.com/flowwer-dev/pull-request-stats/actions?query=workflow%3ATests)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Pull%20Request%20Stats-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/pull-request-stats)

Github action to print relevant stats about Pull Request reviewers.

The objective of this action is to:

* Reduce the time taken to review pull requests.
* Encourage quality on reviews.
* Help deciding which people to assign as reviewers.

Running this action will create a comment like this, visible in your pull requests:

![](/assets/example.png)

## Usage

Just add this action to one of your [workflow files](https://docs.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow):

```yml
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@v1
```

### Action inputs

The possible inputs for this action are:

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `token` | `GITHUB_TOKEN` or a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with "repo" permission. | `GITHUB_TOKEN` |
| `repositories` | A comma separated list of github repositories to calculate the stats. When specifying other repo(s) it is mandatory to pass a Personal Access Token in the `token` parameter. | Current repository |
| `period` | The length of the period used to calculate the stats, expressed in days. | `30` |
| `charts` | Whether to add a chart to the start or not. Possible values: `true` or `false`. | `false` |
| `sort-by` | The column used to sort the data. Possible values: `TIME`, `COMMENTS`, `REVIEWS`. | `TIME` |


## Examples

**Minimal config**

Add this to the file `.github/workflows/stats.yml`:

```yml
name: Pull Request Stats

on: pull_request

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@v1
```

This will print a table like this:

|                                                                                                                                                                  | User        | Avg. time to first review | Total pull reviews | Total comments |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------- | ------------------ | -------------- |
| <a href=https://github.com/noelrock333><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="20"></a>                                           | noelrock333 | **34m**                   | 11                 | 1              |
| <a href=https://github.com/Salomon21><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="20"></a> | Salomon21   | 1h 10m                    | 1                  | 0              |
| <a href=https://github.com/manuelmhtr><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="20"></a> | manuelmhtr  | 1h 21m                    | **33**             | **43**         |
| <a href=https://github.com/LXLH><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="20"></a>                                                  | LXLH        | 1h 41m                    | 18                 | 4              |
| <a href=https://github.com/Phaze1D><img src="https://avatars1.githubusercontent.com/u/8495952?u=19bbf940d00c110d3ca5db5abd00684fa1fad8d3&v=4" width="20"></a>    | Phaze1D     | 3h 11m                    | 6                  | 0              |


**Visual config**

Add this to the file `.github/workflows/stats.yml`:

```yml
name: Pull Request Stats

on: pull_request

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@v1
        with:
          token: ${{ secrets.ADD_A_PERSONAL_ACCESS_TOKEN }}
          repositories: 'username/repo1,username/repo2,username/repo3'
          period: 7
          charts: true
          sort-by: 'COMMENTS'
```

This config will:

* Calculate the reviewer stats for the 3 repos in the lasts 7 days
* Display charts for the metrics
* Sort results by the "comments" column

And print a table like this:

|                                                                                                                                                                     | User                 | Avg. time to first review | Total pull reviews | Total comments      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------- | ------------------ | ------------------- |
| <a href=https://github.com/manuelmhtr><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="32"></a>    | manuelmhtr<br/>🥇    | 53m<br/>                  | **8**<br/>▀▀▀▀     | **12**<br/>▀▀▀▀▀▀▀▀ |
| <a href=https://github.com/LXLH><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="32"></a>                                                     | LXLH<br/>🥈          | 58m<br/>                  | 4<br/>▀▀           | 1<br/>▀             |
| <a href=https://github.com/JohanAlvarado><img src="https://avatars1.githubusercontent.com/u/4240201?u=5f845c5d64ccdef5da89024edd22fcbb306bad82&v=4" width="32"></a> | JohanAlvarado<br/>🥉 | 1d 16h 18m<br/>▀▀▀▀▀▀     | 2<br/>▀            | 1<br/>▀             |
| <a href=https://github.com/Estebes10><img src="https://avatars1.githubusercontent.com/u/22161828?v=4" width="32"></a>                                               | Estebes10<br/>       | **19m**<br/>              | 1<br/>             | 1<br/>▀             |
| <a href=https://github.com/noelrock333><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="32"></a>                                              | noelrock333<br/>     | 2h 15m<br/>               | 2<br/>▀            | 0<br/>              |
| <a href=https://github.com/Phaze1D><img src="https://avatars1.githubusercontent.com/u/8495952?u=19bbf940d00c110d3ca5db5abd00684fa1fad8d3&v=4" width="32"></a>       | Phaze1D<br/>         | 1h 28m<br/>               | 3<br/>▀            | 0<br/>              |
| <a href=https://github.com/Salomon21><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="32"></a>    | Salomon21<br/>       | 21h 24m<br/>▀▀▀           | 1<br/>             | 0<br/>              |


### License

AGPLv3
