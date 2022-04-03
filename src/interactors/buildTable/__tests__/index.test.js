const reviewers = require('../../__tests__/mocks/populatedReviewers.json');
const buildTable = require('../index');

const SIMPLE_RESPONSE = `|                                                                                                            | User  | Total reviews | Time to review | Total comments |
| ---------------------------------------------------------------------------------------------------------- | ----- | ------------- | -------------- | -------------- |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a> | user1 | **4**         | **34m**        | 1              |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a> | user2 | 1             | 2h 21m         | **5**          |`;

const CHARTS_RESPONSE = `|                                                                                                            | User         | Total reviews      | Time to review      | Total comments     |
| ---------------------------------------------------------------------------------------------------------- | ------------ | ------------------ | ------------------- | ------------------ |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="32"></a> | user1<br/>🥇 | **4**<br/>▀▀▀▀▀▀▀▀ | **34m**<br/>▀▀      | 1<br/>▀▀           |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="32"></a> | user2<br/>🥈 | 1<br/>▀▀           | 2h 21m<br/>▀▀▀▀▀▀▀▀ | **5**<br/>▀▀▀▀▀▀▀▀ |`;

const LINKS_RESPONSE = `|                                                                                                            | User  | Total reviews | Time to review                                          | Total comments |
| ---------------------------------------------------------------------------------------------------------- | ----- | ------------- | ------------------------------------------------------- | -------------- |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="20"></a> | user1 | **4**         | [**34m**](https://app.flowwer.dev/charts/review-time/1) | 1              |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="20"></a> | user2 | 1             | [2h 21m](https://app.flowwer.dev/charts/review-time/2)  | **5**          |`;

const LINKS_AND_CHARTS_RESPONSE = `|                                                                                                            | User         | Total reviews      | Time to review                                                      | Total comments     |
| ---------------------------------------------------------------------------------------------------------- | ------------ | ------------------ | ------------------------------------------------------------------- | ------------------ |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/1234" width="32"></a> | user1<br/>🥇 | **4**<br/>▀▀▀▀▀▀▀▀ | [**34m**](https://app.flowwer.dev/charts/review-time/1)<br/>▀▀      | 1<br/>▀▀           |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/5678" width="32"></a> | user2<br/>🥈 | 1<br/>▀▀           | [2h 21m](https://app.flowwer.dev/charts/review-time/2)<br/>▀▀▀▀▀▀▀▀ | **5**<br/>▀▀▀▀▀▀▀▀ |`;

describe('Interactors | .buildTable', () => {
  it('returns all available reviewers in a set of pull requests', () => {
    const response = buildTable({ reviewers, disableLinks: true });
    expect(response).toEqual(SIMPLE_RESPONSE);
  });

  it('can add charts to the table', () => {
    const response = buildTable({ reviewers, displayCharts: true, disableLinks: true });
    expect(response).toEqual(CHARTS_RESPONSE);
  });

  it('with links enabled by default', () => {
    const response = buildTable({ reviewers });
    expect(response).toEqual(LINKS_RESPONSE);
  });

  it('with links and charts', () => {
    const response = buildTable({ reviewers, displayCharts: true });
    expect(response).toEqual(LINKS_AND_CHARTS_RESPONSE);
  });
});
