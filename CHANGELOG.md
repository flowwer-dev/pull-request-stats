# Changelog
All notable changes to this project will be documented in this file.

## [2.2.2] - 2022-04-02
### Changed
- Makes "telemetry" a premium feature for sponsors.

## [2.2.1] - 2022-03-29
### Changed
- Moved from AGPLv3 license to MIT ❤️

## [2.2.0] - 2022-02-27
### Added
- Add disclaimer about privacy ([#22](https://github.com/flowwer-dev/pull-request-stats/pull/22) by [marcocrasso](https://github.com/marcocrasso)).
- Add `telemetry` option to prevent monitoring data used to improve this action.

## [2.1.3] - 2022-02-02
### Fixed
- [#20](https://github.com/flowwer-dev/pull-request-stats/issues/20) Add extra new line before stats table ([#21](https://github.com/flowwer-dev/pull-request-stats/pull/21) by [dantehemerson](https://github.com/dantehemerson)).

## [2.1.2] - 2021-11-28
### Added
- Support for `pull_request_target` event.

## [2.1.1] - 2021-08-24
### Fixes
- Fixes a bug introduced with `limit` option (reviewers sort was broken).

## [2.1.0] - 2021-08-23
### Added
- Option `limit` to indicate the maximum numbers of rows to display in the table ([#13](https://github.com/flowwer-dev/pull-request-stats/pull/13) by [escudero89](https://github.com/escudero89))

## [2.0.3] - 2021-08-02
### Fixed
- [#7](https://github.com/flowwer-dev/pull-request-stats/issues/7) Do not duplicate results table when there's no other content

## [2.0.2] - 2021-07-22
### Changed
- Ignore pull requests of deleted users (by [Derek Young](https://github.com/derek-young))

## [2.0.1] - 2021-04-19
### Changed
- Fixes bug related with bots authoring or reviewing pull requests (#3)
- Fixed bug on `href` property in avatars (adds ").

## [2.0.0] - 2021-04-03
### Added
- Adds the option `organization` to calculate the stats **across all the repos** in the organization.

### Changed
- Switched to Github's GraphAPI to minimize the number of requests and **calculate the stats faster**.
- The stats are printed at the bottom of the description of the pull request, rather than as a commit comment.
- When the title `Pull reviewers stats` is already present in the pull request the action is skipped.
- `Avg. time to first review` is renamed to `Median time to review`, and is no longer the average but the median.
- `Total pull reviews` is renamed to `Total reviews`.
- The default order is now by `Total reviews`.
- The columns order depends on the `sort-by` option, to put the sorting column first.


## [1.1.0] - 2020-10-27
### Added
- Adds links in the "Avg. time to first review" column to a chart with the historical data.
- Adds the option `disable-links` to remove the links to the charts.


## [1.0.3] - 2020-10-23
### Changed
- Adds support for the `pull_request` event.


## [1.0.2] - 2020-07-20
### Changed
- Adds Mixpanel to get some usage insights.


## [1.0.1] - 2020-07-13
### Changed
- Bug fixing.


## [1.0.0] - 2020-07-13
### Changed
- First launch, with ♥ from Guadalajara, Mexico.
