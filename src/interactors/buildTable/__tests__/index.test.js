const reviewers = require('./mocks/reviewersWithStats.json');
const buildTable = require('../index');

const SIMPLE_RESPONSE = `|                                                                                                          | User  | Avg. time to first review | Total pull reviews | Total comments |
| -------------------------------------------------------------------------------------------------------- | ----- | ------------------------- | ------------------ | -------------- |
| <a href=https://github.com/user1><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a> | user1 | **34m**                   | **4**              | 1              |
| <a href=https://github.com/user2><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a> | user2 | 2h 21m                    | 1                  | **5**          |`;

const CHARTS_RESPONSE = `|                                                                                                          | User         | Avg. time to first review | Total pull reviews | Total comments     |
| -------------------------------------------------------------------------------------------------------- | ------------ | ------------------------- | ------------------ | ------------------ |
| <a href=https://github.com/user1><img src="https://avatars.githubusercontent.com/u/1234" width="32"></a> | user1<br/>🥇 | **34m**<br/>▀▀            | **4**<br/>▀▀▀▀▀▀▀▀ | 1<br/>▀▀           |
| <a href=https://github.com/user2><img src="https://avatars.githubusercontent.com/u/5678" width="32"></a> | user2<br/>🥈 | 2h 21m<br/>▀▀▀▀▀▀▀▀       | 1<br/>▀▀           | **5**<br/>▀▀▀▀▀▀▀▀ |`;

const SORTED_RESPONSE = `|                                                                                                          | User  | Avg. time to first review | Total pull reviews | Total comments |
| -------------------------------------------------------------------------------------------------------- | ----- | ------------------------- | ------------------ | -------------- |
| <a href=https://github.com/user2><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a> | user2 | 2h 21m                    | 1                  | **5**          |
| <a href=https://github.com/user1><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a> | user1 | **34m**                   | **4**              | 1              |`;

const LINKS_RESPONSE = `|                                                                                                          | User  | Avg. time to first review                                                                                                                                    | Total pull reviews | Total comments |
| -------------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | -------------- |
| <a href=https://github.com/user1><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a> | user1 | [**34m**](https://app.flowwer.dev/charts/review-time/~(u~(i~'1234~n~'user1)~r~(~(d~'qpvagu~t~'a3)~(d~'qpvn25~t~'3lu)~(d~'qprzn9~t~'84)~(d~'qqqtu5~t~'2vy)))) | **4**              | 1              |
| <a href=https://github.com/user2><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a> | user2 | [2h 21m](https://app.flowwer.dev/charts/review-time/~(u~(i~'5678~n~'user2)~r~(~(d~'qq0fbc~t~'6j5))))                                                         | 1                  | **5**          |`;

const LINKS_AND_CHARTS_RESPONSE = `|                                                                                                          | User         | Avg. time to first review                                                                                                                                           | Total pull reviews | Total comments     |
| -------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------ |
| <a href=https://github.com/user1><img src="https://avatars.githubusercontent.com/u/1234" width="32"></a> | user1<br/>🥇 | [**34m**](https://app.flowwer.dev/charts/review-time/~(u~(i~'1234~n~'user1)~r~(~(d~'qpvagu~t~'a3)~(d~'qpvn25~t~'3lu)~(d~'qprzn9~t~'84)~(d~'qqqtu5~t~'2vy))))<br/>▀▀ | **4**<br/>▀▀▀▀▀▀▀▀ | 1<br/>▀▀           |
| <a href=https://github.com/user2><img src="https://avatars.githubusercontent.com/u/5678" width="32"></a> | user2<br/>🥈 | [2h 21m](https://app.flowwer.dev/charts/review-time/~(u~(i~'5678~n~'user2)~r~(~(d~'qq0fbc~t~'6j5))))<br/>▀▀▀▀▀▀▀▀                                                   | 1<br/>▀▀           | **5**<br/>▀▀▀▀▀▀▀▀ |`;

describe('Interactors | .buildTable', () => {
  it('returns all available reviewers in a set of pull requests', () => {
    const response = buildTable(reviewers, { disableLinks: true });
    expect(response).toEqual(SIMPLE_RESPONSE);
  });

  it('can add charts to the table', () => {
    const response = buildTable(reviewers, { displayCharts: true, disableLinks: true });
    expect(response).toEqual(CHARTS_RESPONSE);
  });

  it('support sort by other column', () => {
    const response = buildTable(reviewers, { sortBy: 'COMMENTS', disableLinks: true });
    expect(response).toEqual(SORTED_RESPONSE);
  });

  it('with links enabled by default', () => {
    const response = buildTable(reviewers);
    expect(response).toEqual(LINKS_RESPONSE);
  });

  it('with links and charts', () => {
    const response = buildTable(reviewers, { displayCharts: true });
    expect(response).toEqual(LINKS_AND_CHARTS_RESPONSE);
  });
});
