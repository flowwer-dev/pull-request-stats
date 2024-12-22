# Changelog
All notable changes to this project will be documented in this file.

## [3.1.0] - 2024-12-22
### Added
- Adds new available stats: `reviewedAdditions`, `reviewedDeletions`, `reviewedLines`, `totalObservations`, `medianObservations`, `revisionSuccessRate`, `additions`, `deletions` and `lines`.

### Changes
- `commentsPerReview` is calculated now as the median, not the average.

## [3.0.0] - 2024-12-12
### Added
- New `stats` option to specify the stats to be calculated.

### Breaking changes
- Deprecated the kebab case options: `publish-as`, `disable-links`, `sort-by`, `slack-webhook`, `slack-channel` and `teams-webhook`. Now you need to use the camel case format: `publishAs`, `disableLinks`, `sortBy`, `slackWebhook`, `slackChannel` and `teamsWebhook`.`
- The values for `sortBy` have changed. `REVIEWS`, `TIME`, `COMMENTS` are invalid. Now you need to use the full name of the stat that will be used for sorting, for example: `totalComments`, `timeToReview`...
- The JSON output for the action and the JSON payload for the webhook have changed. Check the new format in the [webhook documentation](/docs/webhook.md).
- Renamed branch `master` to `main`.

## [2.15.2] - 2024-12-01
### Fixed
- Prevents `githubToken` and `personalToken` from be included in the JSON output.

## [2.15.1] - 2024-07-19
### Changes
- Fix on "Build with" link.
- Adds web version announcement.

## [2.15.0] - 2024-04-27
### Added
- Support for hosted GitHub variants with non-standard domains (e.g., GitHub Enterprise).

## [2.14.0] - 2024-03-03
### Added
- Announcing the web version development.
- Improved telemetry, by adding a reviewers summary.
- "Build with" link in the footer.

## [2.13.0] - 2024-02-10
### Added
- `exclude` option to exclude specific users from the stats.

### Fixed
- Reduces the block size in the Slack messages to prevent hitting the characters limit.

## [2.12.0] - 2024-02-06
### Changed
- [#85](https://github.com/flowwer-dev/pull-request-stats/pull/85) Use Node v20 (by [antonindrawan](https://github.com/antonindrawan))

## [2.11.0] - 2023-07-22
### Added
- [#76](https://github.com/flowwer-dev/pull-request-stats/pull/76) Add stats as a github step output (by [Danny McCormick](https://github.com/damccorm))

### Changed
- Changed input to camelCase format, keeping the old ones for backward compatibility. Eg: `publish-as` is now `publishAs`.

### Fixed
- [#75](https://github.com/flowwer-dev/pull-request-stats/pull/75) Iterate pull request pages correctly when having null authors (by [Glen Keane](https://github.com/GlenTiki))

## [2.10.0] - 2023-07-11
### Added
- `publish-as` config now supports the `NONE` option to prevent publishing the stats in the pull request.

## [2.9.0] - 2023-06-03
### Added
- [#70](https://github.com/flowwer-dev/pull-request-stats/pull/70) Removes `-review:none` filter. Let PRs with requested changes be included in the stats (By [Danny McCormick](https://github.com/damccorm)).

## [2.8.1] - 2023-03-20
### Added
- Reference to "Recap" action.
- Adding Recap and Link actions.

## [2.8.0] - 2023-03-18
### Added
- Get private sponsors from a dynamic list.

## [2.7.3] - 2023-03-17
### Added
- A new private sponsor 💙

## [2.7.2] - 2023-03-15
### Added
- A new private sponsor 💙

## [2.7.1] - 2023-01-29
### Added
- A new private sponsor 💙

### Changed
- Updated sponsorship policy to make it more flexible.

## [2.7.0] - 2022-12-22
### Added
- [#61](https://github.com/flowwer-dev/pull-request-stats/pull/61) Post results in the Action Summary (By [Petar Alilovic](https://github.com/runmael)).

## [2.6.2] - 2022-12-14
### Fixed
- [#60](https://github.com/flowwer-dev/pull-request-stats/pull/60) Display last repository in slack and teams message body (By [Daeeun Kim](https://github.com/eodmsabc)).

## [2.6.1] - 2022-10-28
### Added
- A new private sponsor 💙

## [2.6.0] - 2022-10-24
### Added
- Microsoft Teams integration.

## [2.5.1] - 2022-10-17
### Changed
- Running on NodeJS 16.

## [2.5.0] - 2022-09-05
### Added
- Webhooks integration.

## [2.4.6] - 2022-09-01
### Fixed
- [#48](https://github.com/flowwer-dev/pull-request-stats/issues/48) Prevent sponsorship query error on Github Enterprise environments.

## [2.4.5] - 2022-08-27
### Fixed
- [#38](https://github.com/flowwer-dev/pull-request-stats/issues/38#issuecomment-1171087421) Split Slack message to prevent hitting characters limit.

## [2.4.4] - 2022-08-21
### Fixed
- [#46](https://github.com/flowwer-dev/pull-request-stats/issues/46) Filtering reviewers with `undefined` name.

## [2.4.3] - 2022-08-03
### Added
- Support for external sponsors.
### Changed
- Improved description links.
### Fixed
- [#44](https://github.com/flowwer-dev/pull-request-stats/issues/44) Fixed problem reading repo when triggered by `schedule` event.

## [2.4.2] - 2022-06-21
### Fixed
- [#37](https://github.com/flowwer-dev/pull-request-stats/issues/37) Problem causing `token` parameter to be empty.

## [2.4.1] - 2022-06-19
### Changed
- Printing the name and link of the organization or repos that are included on stats calculation.

## [2.4.0] - 2022-06-18
### Added
- [#24](https://github.com/flowwer-dev/pull-request-stats/issues/24) Adds option `publish-as` to publish the resulting stats in the Pull Request description or as a comment.

### Changed
- Switching default publication strategy to `COMMENT`.

## [2.3.2] - 2022-06-11
### Fixed
- [#33](https://github.com/flowwer-dev/pull-request-stats/issues/33) Limits links length to 1,024 characters to prevent `KeyTooLongError` error.
- [#34](https://github.com/flowwer-dev/pull-request-stats/issues/34) Permits running the action with `schedule` trigger.

## [2.3.1] - 2022-05-19
### Added
- Logs to debug Slack integration.

## [2.3.0] - 2022-04-03
### Added
- Slack integration.

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
