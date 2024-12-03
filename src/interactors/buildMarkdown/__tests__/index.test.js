const { table } = require('../../../../tests/mocks');
const buildTable = require('../index');

const EXPECTED_RESPONSE = `|                                                                                                             | User         | Total reviews      | Time to review                                                     | Total comments     | Comments per review | Opened PRs          |
| ----------------------------------------------------------------------------------------------------------- | ------------ | ------------------ | ------------------------------------------------------------------ | ------------------ | ------------------- | ------------------- |
| <a href="https://github.com/user1"><img src="https://avatars.githubusercontent.com/u/user1" width="32"></a> | user1<br/>🥇 | **4**<br/>▀▀▀▀▀▀▀▀ | [34m](https://app.flowwer.dev/charts/review-time/1)<br/>▀▀         | 1<br/>▀▀           | 0.25<br/>           | 7<br/>▀▀            |
| <a href="https://github.com/user2"><img src="https://avatars.githubusercontent.com/u/user2" width="32"></a> | user2<br/>🥈 | 1<br/>▀▀           | [2h 21m](https://app.flowwer.dev/charts/review-time/2)<br/>▀▀▀▀▀▀▀ | **5**<br/>▀▀▀▀▀▀▀▀ | **5**<br/>▀▀▀▀▀▀▀▀  | 3<br/>▀             |
| <a href="https://github.com/user3"><img src="https://avatars.githubusercontent.com/u/user3" width="32"></a> | user3<br/>🥉 | 0<br/>             | [**17m**](https://app.flowwer.dev/charts/review-time/3)<br/>▀      | 0<br/>             | 1<br/>▀▀            | **30**<br/>▀▀▀▀▀▀▀▀ |`;

describe('Interactors | .buildTable', () => {
  it('builds a formatted markdown table', () => {
    const response = buildTable({ table });
    expect(response).toEqual(EXPECTED_RESPONSE);
  });
});
