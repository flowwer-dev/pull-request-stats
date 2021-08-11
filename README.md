# Pull Request Stats

[![CI](https://github.com/flowwer-dev/pull-request-stats/workflows/Tests/badge.svg)](https://github.com/flowwer-dev/pull-request-stats/actions?query=workflow%3ATests)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Pull%20Request%20Stats-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/pull-request-stats)

Github action to print relevant stats about Pull Request reviewers.

The objective of this action is to:

* Reduce the time taken to review the pull requests.
* Encourage quality on reviews.
* Help deciding which people to assign as reviewers.

Running this action will add a section at the bottom of your pull requests description:

![](/assets/pull-request.png)

Each reviewer has a link pointing to their [historical behavior](https://app.flowwer.dev/charts/review-time/~(u~(i~'2741~n~'ddh)~p~30~r~(~(d~'qq57xy~t~'3co)~(d~'qqedft~t~'i1i)~(d~'qqfmub~t~'1rg0)~(d~'qqhjco~t~'5u)~(d~'qqlxa9~t~'20lw)~(d~'qqqo38~t~'2kp)~(d~'qpgl4i~t~'40i)~(d~'qpgq0r~t~'8wr)~(d~'qpgqv1~t~'9r1)~(d~'qqdzub~t~'398)~(d~'qq2xpc~t~'iz)~(d~'qpgoox~t~'1ep)~(d~'qpggla~t~'dt)~(d~'qpin24~t~'3nk)~(d~'qpi9kk~t~'1a89)~(d~'qpf7la~t~'jlz)~(d~'qprdyz~t~'1201)~(d~'qprf42~t~'1354)~(d~'qq4tod~t~'4ye)~(d~'qq4u7p~t~'5hq)~(d~'qq4wf3~t~'7p4)~(d~'qq4wgp~t~'7qq)~(d~'qq4g4a~t~'2v3)~(d~'qptb3r~t~'25p)~(d~'qpobfp~t~'2aq)~(d~'qq70w7~t~'ux)~(d~'qq6p5h~t~'g3d)~(d~'qqedrz~t~'im6)~(d~'qqg4sc~t~'b4)~(d~'qqlxo9~t~'a4s)~(d~'qqun50~t~'2nz)~(d~'qqr8mt~t~'14q)~(d~'qqumbp~t~'1fp)))) of each reviewer:

![](/assets/historical.png)

## Usage

Just add this action to one of your [workflow files](https://docs.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow):

```yml
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@master
```

### Action inputs

The possible inputs for this action are:

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `token` | `GITHUB_TOKEN` or a [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with "repo" permission. | `GITHUB_TOKEN` |
| `repositories` | A comma separated list of github repositories to calculate the stats. When specifying other repo(s) **it is mandatory to pass a Personal Access Token** in the `token` parameter. | Current repository |
| `organization` | If you prefer, you may specify the name of your organization to calculate the stats across all of its repos. When specifying an organization **it is mandatory to pass a Personal Access Token** in the `token` parameter. | `null`|
| `period` | The length of the period used to calculate the stats, expressed in days. | `30` |
| `charts` | Whether to add a chart to the start or not. Possible values: `true` or `false`. | `false` |
| `disable-links` | If `true`, removes the links to the detailed charts. Possible values: `true` or `false`. | `false` |
| `sort-by` | The column used to sort the data. Possible values: `REVIEWS`, `TIME`, `COMMENTS`. | `REVIEWS` |


## Examples

**Minimal config**

Add this to the file `.github/workflows/stats.yml` in your repo:

```yml
name: Pull Request Stats

on: pull_request

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@master
```

This config will:

* Calculate the reviewer stats for the current repo in the lasts 30 days
* Add links to the historial data
* Sort results by the "total reviews" column by default

and print a table like this:

|                                                                                                                                                                    | User          | Total reviews | Median time to review                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Total comments |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------- |
| <a href="https://github.com/jartmez"><img src="https://avatars.githubusercontent.com/u/8755542?u=5f845c5d64ccdef5da89024edd22fcbb306bad82&v=4" width="20"></a> | jartmez | **37**        | [**22m**](https://app.flowwer.dev/charts/review-time/~(u~(i~'8755542~n~'jartmez)~p~30~r~(~(d~'qpo9q0~t~'3j)~(d~'qq6cdw~t~'1g6v)~(d~'qq6trt~t~'6f)~(d~'qqjoj2~t~'3o)~(d~'qqjrvc~t~'36y)~(d~'qqfii9~t~'48)~(d~'qql57e~t~'2dp)~(d~'qqr6hn~t~'5k5f)~(d~'qpo899~t~'10d)~(d~'qpip3i~t~'7n)~(d~'qqjoyy~t~'t)~(d~'qql5c7~t~'1df)~(d~'qproj0~t~'3gk)~(d~'qqhhp4~t~'l)~(d~'qqhm9c~t~'13)~(d~'qqr6fl~t~'5gql)~(d~'qpeihh~t~'p4)~(d~'qpejk4~t~'10)~(d~'qprnsu~t~'2ce)~(d~'qprr5k~t~'6b)~(d~'qptpyf~t~'3v)~(d~'qpnutn~t~'zn)~(d~'qpponp~t~'2oh)~(d~'qq8aui~t~'16z)~(d~'qq8aut~t~'b5)~(d~'qq6cdd~t~'fh)~(d~'qq6f4b~t~'1g)~(d~'qq9vxk~t~'187g)~(d~'qqjohl~t~'et)~(d~'qqjl7a~t~'17)~(d~'qqkybd~t~'ku4)~(d~'qql5cn~t~'2l1)~(d~'qqr6iq~t~'5k5o)~(d~'qpegg0~t~'v7s)~(d~'qpii21~t~'aw7)~(d~'qpi8p0~t~'19cp)~(d~'qptjgu~t~'s6)~(d~'qppjc0~t~'1a71)~(d~'qqqnl1~t~'501k))))                                                                                                                                       | 13             |
| <a href="https://github.com/manuelmhtr"><img src="https://avatars.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="20"></a>    | manuelmhtr    | 35            | [48m](https://app.flowwer.dev/charts/review-time/~(u~(i~'1031639~n~'manuelmhtr)~p~30~r~(~(d~'qq69s3~t~'156t)~(d~'qq6yq2~t~'4sy)~(d~'qq4ok9~t~'1jg)~(d~'qq363y~t~'4ab)~(d~'qqfq2q~t~'41)~(d~'qqj7fl~t~'12ng)~(d~'qqjvds~t~'1s9)~(d~'qqjanx~t~'1ze)~(d~'qqqwdx~t~'16g)~(d~'qqshq9~t~'bu)~(d~'qqsmra~t~'34)~(d~'qqfht9~t~'17l4)~(d~'qpigjp~t~'4a)~(d~'qpf7g2~t~'mv)~(d~'qqhwld~t~'7ei)~(d~'qq2kb8~t~'6ylo)~(d~'qpgujm~t~'ml)~(d~'qqfl7t~t~'9x)~(d~'qqfijx~t~'31t)~(d~'qqljx2~t~'1oe5)~(d~'qqsgm1~t~'11d0)~(d~'qqug3q~t~'gr)~(d~'qpginp~t~'1jp)~(d~'qpgv2b~t~'xv)~(d~'qq4w8a~t~'1kd)~(d~'qq8m4j~t~'1e)~(d~'qqdxja~t~'y7)~(d~'qq3356~t~'5yt)~(d~'qq35dl~t~'jq)~(d~'qpegn5~t~'vex)~(d~'qpejqb~t~'7v)~(d~'qpifjv~t~'8e1)~(d~'qpnpv9~t~'4s0a)~(d~'qptd4w~t~'14gf)~(d~'qq353p~t~'9fh9)~(d~'qq6cii~t~'13ez)~(d~'qq6tlq~t~'58x)~(d~'qq8l4d~t~'19z)~(d~'qqqte3~t~'27e)~(d~'qqqu19~t~'2uk)~(d~'qqr3ro~t~'3h7)~(d~'qqubcl~t~'19f4)~(d~'qqt08u~t~'j1))))                                                    | **96**         |
| <a href="https://github.com/ernestognw"><img src="https://avatars.githubusercontent.com/u/33379285?u=c50ed2928058edc5d412af3d9b9045f6e3309970&v=4" width="20"></a>   | ernestognw    | 25            | [1h 27m](https://app.flowwer.dev/charts/review-time/~(u~(i~'33379285~n~'ernestognw)~p~30~r~(~(d~'qq57xy~t~'3co)~(d~'qqedft~t~'i1i)~(d~'qqfmub~t~'1rg0)~(d~'qqhjco~t~'5u)~(d~'qqlxa9~t~'20lw)~(d~'qqqo38~t~'2kp)~(d~'qpgl4i~t~'40i)~(d~'qpgq0r~t~'8wr)~(d~'qpgqv1~t~'9r1)~(d~'qqdzub~t~'398)~(d~'qq2xpc~t~'iz)~(d~'qpgoox~t~'1ep)~(d~'qpggla~t~'dt)~(d~'qpin24~t~'3nk)~(d~'qpi9kk~t~'1a89)~(d~'qpf7la~t~'jlz)~(d~'qprdyz~t~'1201)~(d~'qprf42~t~'1354)~(d~'qq4tod~t~'4ye)~(d~'qq4u7p~t~'5hq)~(d~'qq4wf3~t~'7p4)~(d~'qq4wgp~t~'7qq)~(d~'qq4g4a~t~'2v3)~(d~'qptb3r~t~'25p)~(d~'qpobfp~t~'2aq)~(d~'qq70w7~t~'ux)~(d~'qq6p5h~t~'g3d)~(d~'qqedrz~t~'im6)~(d~'qqg4sc~t~'b4)~(d~'qqlxo9~t~'a4s)~(d~'qqun50~t~'2nz)~(d~'qqr8mt~t~'14q)~(d~'qqumbp~t~'1fp))))                                                                                                                                                                                                                                           | 63             |
| <a href="https://github.com/javierbyte"><img src="https://avatars.githubusercontent.com/u/2009676?u=9aa491152ac3aba42ef8c485cb5331f48bc2fce6&v=4" width="20"></a>      | javierbyte       | 12            | [30m](https://app.flowwer.dev/charts/review-time/~(u~(i~'2009676~n~'javierbyte)~p~30~r~(~(d~'qpezo6~t~'zh)~(d~'qqutun~t~'1o)~(d~'qqupn8~t~'1ry)~(d~'qqslpr~t~'6e6)~(d~'qqslq9~t~'6dg)~(d~'qqslp1~t~'6e5)~(d~'qqqqw9~t~'3v)~(d~'qqqy91~t~'5l1)~(d~'qpeolc~t~'gy)~(d~'qpf2hy~t~'ay)~(d~'qqufaz~t~'16pf)~(d~'qquho8~t~'1y))))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 0              |
| <a href="https://github.com/Phaze1D"><img src="https://avatars.githubusercontent.com/u/8495952?v=4" width="20"></a>                                                   | Phaze1D       | 4             | [34m](https://app.flowwer.dev/charts/review-time/~(u~(i~'8495952~n~'Phaze1D)~p~30~r~(~(d~'qprzn9~t~'84)~(d~'qpvagu~t~'a3)~(d~'qpvn25~t~'3lu)~(d~'qqqtu5~t~'2vy))))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1              |


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
        uses: flowwer-dev/pull-request-stats@master
        with:
          token: ${{ secrets.ADD_A_PERSONAL_ACCESS_TOKEN }}
          organization: 'piedpiper'
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

and print a table like this:

|                                                                                                                                                                     | User                 | Total comments      | Total reviews      | Median time to review     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------- | ------------------ | ------------------- |
| <a href="https://github.com/manuelmhtr"><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="32"></a>    | manuelmhtr<br/>🥇    | **12**<br/>▀▀▀▀▀▀▀▀ | **8**<br/>▀▀▀▀     | 53m<br/>                  |
| <a href="https://github.com/jartmez"><img src="https://avatars0.githubusercontent.com/u/8755542?v=4" width="32"></a>                                                  | jartmez<br/>🥈       | 3<br/>▀▀            | 4<br/>▀▀           | 58m<br/>                  |
| <a href="https://github.com/JohanAlvarado"><img src="https://avatars1.githubusercontent.com/u/4240201?u=5f845c5d64ccdef5da89024edd22fcbb306bad82&v=4" width="32"></a> | JohanAlvarado<br/>🥉 | 1<br/>▀             | 2<br/>▀            | 1d 16h 18m<br/>▀▀▀▀▀▀     |
| <a href="https://github.com/Estebes10"><img src="https://avatars1.githubusercontent.com/u/22161828?v=4" width="32"></a>                                               | Estebes10<br/>       | 1<br/>▀             | 1<br/>             | **19m**<br/>              |
| <a href="https://github.com/ernestognw"><img src="https://avatars1.githubusercontent.com/u/33379285?v=4" width="32"></a>                                              | ernestognw<br/>      | 0<br/>              | 2<br/>▀            | 2h 15m<br/>               |
| <a href="https://github.com/Phaze1D"><img src="https://avatars1.githubusercontent.com/u/8495952?u=19bbf940d00c110d3ca5db5abd00684fa1fad8d3&v=4" width="32"></a>       | Phaze1D<br/>         | 0<br/>              | 3<br/>▀            | 1h 28m<br/>               |
| <a href="https://github.com/javierbyte"><img src="https://avatars0.githubusercontent.com/u/2009676?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="32"></a>    | javierbyte<br/>      | 0<br/>              | 1<br/>             | 21h 24m<br/>▀▀▀           |

## Stats

The stats are calculated as following:

* **Time to review:** It is the time taken by a reviewer from the _Pull Request publication_ or the last _Commit push_ (whatever happens last) to the first time the pull request is reviewed.
* **Median time to review:** It is the median of the _times to review_ of all Pull Requests reviewed by a person in the period.
* **Total reviews:** It is the count of all Pull Requests reviewed by a person in the period.
* **Total comments:** It is the count of all the comments while reviewing other user's Pull Requests in the period (comments in own PRs don't count).

## Used by

Used by tens of successful teams like:

| <a href="https://shop.lululemon.com"><img src="https://avatars.githubusercontent.com/u/17386352?s=200&v=4" width="64"></a><br/>Lululemon | <a href="https://www.gainfully.com"><img src="https://avatars.githubusercontent.com/u/1594519?s=200&v=4" width="64"></a><br/>Ganfully | <a href="https://www.deliveryhero.com"><img src="https://avatars.githubusercontent.com/u/7225556?s=200&v=4" width="64"></a><br/>Delivery Hero | <a href="https://she-inc.co.jp"><img src="https://avatars.githubusercontent.com/u/73983044?s=200&v=4" width="64"></a><br/>SHE Inc | <a href="https://www.usehatchapp.com/"><img src="https://avatars.githubusercontent.com/u/38331218?s=200&v=4" width="64"></a><br/>Hatch | <a href="https://www.oneflare.com.au/"><img src="https://avatars.githubusercontent.com/u/889807?s=200&v=4" width="64"></a><br/>Oneflare | <a href="https://www.confluent.io/"><img src="https://avatars.githubusercontent.com/u/9439498?s=200&v=4" width="64"></a><br/>Confluent Inc | <a href="https://www.yotepresto.com/"><img src="https://avatars.githubusercontent.com/u/31322412?s=200&v=4" width="64"></a><br/>Yotepresto |
| -- | -- | -- | -- | -- | -- | -- | -- |

## Help

This project is maintained by a single person, considering supporting the project by:

* Sharing your [feedback](https://forms.gle/W18tgBWp5YWt2qYEA).
* Joining the [community](https://discord.gg/SGYbZkac).
* Becoming a [sponsor](https://github.com/sponsors/manuelmhtr).

### License

AGPLv3
