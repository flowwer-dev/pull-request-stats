# Changelog
All notable changes to this project will be documented in this file.

## [2.0.0] - 2021-04-05
### Added
- Adds the option `organization` to calculate the stats **across all the repos** in the organization.

### Changed
- Switched to Github's GraphAPI to minimize the number of requests and **calculate the stats faster**.
- The stats are printed at the bottom of the description of the pull request, rather than as commit comment.
- When the title "Pull reviewers stats" is already present in the pull request the action is skipped.
- The column "Avg. time to first review" is renamed to "Median time to review", and is no longer the average but the median.
- The column "Total pull reviews" is renamed to "Total reviews".


## [1.1.0] - 2020-10-27
### Added
- Adds links in the "Avg. time to first review" column to a chart with the historical data.
- Adds the option `disable-links` to remove the links to the charts.


## [1.0.3] - 2020-10-23
### Changes
- Adds support for the `pull_request` event.


## [1.0.2] - 2020-07-20
### Changes
- Adds Mixpanel to get some usage insights.


## [1.0.1] - 2020-07-13
### Changes
- Bug fixing.


## [1.0.0] - 2020-07-13
### Changes
- First launch, with ♥ from Guadalajara, Mexico.
