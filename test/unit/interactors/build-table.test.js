const buildTable = require(`${ROOT_PATH}/src/interactors/build-table`);

const SIMPLE_RESPONSE = `|                                                                                                                                                              | User  | Avg. time to first review | Total pull reviews | Total comments |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- | ------------------------- | ------------------ | -------------- |
| <a href=https://github.com/user3><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="20"></a>                                             | user3 | **2m**                    | 1                  | 0              |
| <a href=https://github.com/user4><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="20"></a> | user4 | 1h 10m                    | 1                  | 0              |
| <a href=https://github.com/user2><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="20"></a>                                             | user2 | 1h 11m                    | 2                  | 0              |
| <a href=https://github.com/user1><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="20"></a>  | user1 | 1h 48m                    | **8**              | **9**          |`;

const CHARTS_RESPONSE = `|                                                                                                                                                              | User         | Avg. time to first review | Total pull reviews | Total comments       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ------------------------- | ------------------ | -------------------- |
| <a href=https://github.com/user3><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="32"></a>                                             | user3<br/>🥇 | **2m**<br/>               | 1<br/>▀            | 0<br/>               |
| <a href=https://github.com/user4><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="32"></a> | user4<br/>🥈 | 1h 10m<br/>▀▀▀            | 1<br/>▀            | 0<br/>               |
| <a href=https://github.com/user2><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="32"></a>                                             | user2<br/>🥉 | 1h 11m<br/>▀▀▀            | 2<br/>▀▀           | 0<br/>               |
| <a href=https://github.com/user1><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="32"></a>  | user1<br/>   | 1h 48m<br/>▀▀▀▀           | **8**<br/>▀▀▀▀▀▀▀  | **9**<br/>▀▀▀▀▀▀▀▀▀▀ |`;

const SORTED_RESPONSE = `|                                                                                                                                                              | User  | Avg. time to first review | Total pull reviews | Total comments |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- | ------------------------- | ------------------ | -------------- |
| <a href=https://github.com/user1><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="20"></a>  | user1 | 1h 48m                    | **8**              | **9**          |
| <a href=https://github.com/user3><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="20"></a>                                             | user3 | **2m**                    | 1                  | 0              |
| <a href=https://github.com/user4><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="20"></a> | user4 | 1h 10m                    | 1                  | 0              |
| <a href=https://github.com/user2><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="20"></a>                                             | user2 | 1h 11m                    | 2                  | 0              |`;

describe('Interactors | .buildTable', () => {
  const input = global.TestUtils.data.reviewersWithStats;

  it('returns all available reviewers in a set of pull requests', () => {
    const response = buildTable(input);

    expect(response).toEqual(SIMPLE_RESPONSE);
  });

  it('can add charts to the table', () => {
    const response = buildTable(input, { displayCharts: true });

    expect(response).toEqual(CHARTS_RESPONSE);
  });

  it('support sort by other column', () => {
    const response = buildTable(input, { sortBy: 'COMMENTS' });

    expect(response).toEqual(SORTED_RESPONSE);
  });
});
