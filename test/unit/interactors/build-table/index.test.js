const buildTable = require(`${ROOT_PATH}/src/interactors/build-table`);

const SIMPLE_RESPONSE = `|                                                                                                                                                              | User  | Avg. time to first review | Total pull reviews | Total comments |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- | ------------------------- | ------------------ | -------------- |
| <a href=https://github.com/user3><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="20"></a>                                             | user3 | **2m**                    | 1                  | 0              |
| <a href=https://github.com/user2><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="20"></a>                                             | user2 | 27m                       | 2                  | 0              |
| <a href=https://github.com/user1><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="20"></a>  | user1 | 42m                       | **8**              | **9**          |
| <a href=https://github.com/user4><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="20"></a> | user4 | 1h 10m                    | 1                  | 0              |`;

const CHARTS_RESPONSE = `|                                                                                                                                                              | User         | Avg. time to first review | Total pull reviews | Total comments       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ------------------------- | ------------------ | -------------------- |
| <a href=https://github.com/user3><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="32"></a>                                             | user3<br/>🥇 | **2m**<br/>               | 1<br/>▀            | 0<br/>               |
| <a href=https://github.com/user2><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="32"></a>                                             | user2<br/>🥈 | 27m<br/>▀▀                | 2<br/>▀▀           | 0<br/>               |
| <a href=https://github.com/user1><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="32"></a>  | user1<br/>🥉 | 42m<br/>▀▀▀               | **8**<br/>▀▀▀▀▀▀▀  | **9**<br/>▀▀▀▀▀▀▀▀▀▀ |
| <a href=https://github.com/user4><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="32"></a> | user4<br/>   | 1h 10m<br/>▀▀▀▀▀          | 1<br/>▀            | 0<br/>               |`;

const SORTED_RESPONSE = `|                                                                                                                                                              | User  | Avg. time to first review | Total pull reviews | Total comments |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- | ------------------------- | ------------------ | -------------- |
| <a href=https://github.com/user1><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="20"></a>  | user1 | 42m                       | **8**              | **9**          |
| <a href=https://github.com/user3><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="20"></a>                                             | user3 | **2m**                    | 1                  | 0              |
| <a href=https://github.com/user2><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="20"></a>                                             | user2 | 27m                       | 2                  | 0              |
| <a href=https://github.com/user4><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="20"></a> | user4 | 1h 10m                    | 1                  | 0              |`;

const LINKS_RESPONSE = `|                                                                                                                                                              | User  | Avg. time to first review                                                                                                                                                                                                            | Total pull reviews | Total comments |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | -------------- |
| <a href=https://github.com/user3><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="20"></a>                                             | user3 | [**2m**](https://app.flowwer.dev/charts/review-time/~(u~(i~'1341803~n~'user3)~r~(~(d~'qcput3~t~'3b))))                                                                                                                               | 1                  | 0              |
| <a href=https://github.com/user2><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="20"></a>                                             | user2 | [27m](https://app.flowwer.dev/charts/review-time/~(u~(i~'1081065~n~'user2)~r~(~(d~'qcqzy2~t~'qf)~(d~'qcqqyr~t~'1qq))))                                                                                                               | 2                  | 0              |
| <a href=https://github.com/user1><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="20"></a>  | user1 | [42m](https://app.flowwer.dev/charts/review-time/~(u~(i~'1031639~n~'user1)~r~(~(d~'qcrje2~t~'in)~(d~'qcriqr~t~'yy)~(d~'qb501r~t~'5r3)~(d~'qb3ws0~t~'i6)~(d~'q9m1p2~t~'9h)~(d~'q80dmr~t~'2kq)~(d~'q7zhh3~t~'46y)~(d~'q6h61o~t~'ld)))) | **8**              | **9**          |
| <a href=https://github.com/user4><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="20"></a> | user4 | [1h 10m](https://app.flowwer.dev/charts/review-time/~(u~(i~'22354725~n~'user4)~r~(~(d~'qcp8po~t~'38r))))                                                                                                                             | 1                  | 0              |`;

const LINKS_AND_CHARTS_RESPONSE = `|                                                                                                                                                              | User         | Avg. time to first review                                                                                                                                                                                                                    | Total pull reviews | Total comments       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------------------- |
| <a href=https://github.com/user3><img src="https://avatars1.githubusercontent.com/u/1341803?v=4" width="32"></a>                                             | user3<br/>🥇 | [**2m**](https://app.flowwer.dev/charts/review-time/~(u~(i~'1341803~n~'user3)~r~(~(d~'qcput3~t~'3b))))<br/>                                                                                                                                  | 1<br/>▀            | 0<br/>               |
| <a href=https://github.com/user2><img src="https://avatars0.githubusercontent.com/u/1081065?v=4" width="32"></a>                                             | user2<br/>🥈 | [27m](https://app.flowwer.dev/charts/review-time/~(u~(i~'1081065~n~'user2)~r~(~(d~'qcqzy2~t~'qf)~(d~'qcqqyr~t~'1qq))))<br/>▀▀                                                                                                                | 2<br/>▀▀           | 0<br/>               |
| <a href=https://github.com/user1><img src="https://avatars2.githubusercontent.com/u/1031639?u=30204017b73f7a1f08005cb8ead3f70b0410486c&v=4" width="32"></a>  | user1<br/>🥉 | [42m](https://app.flowwer.dev/charts/review-time/~(u~(i~'1031639~n~'user1)~r~(~(d~'qcrje2~t~'in)~(d~'qcriqr~t~'yy)~(d~'qb501r~t~'5r3)~(d~'qb3ws0~t~'i6)~(d~'q9m1p2~t~'9h)~(d~'q80dmr~t~'2kq)~(d~'q7zhh3~t~'46y)~(d~'q6h61o~t~'ld))))<br/>▀▀▀ | **8**<br/>▀▀▀▀▀▀▀  | **9**<br/>▀▀▀▀▀▀▀▀▀▀ |
| <a href=https://github.com/user4><img src="https://avatars0.githubusercontent.com/u/22354725?u=701513ff4a6b0b7a33f4ad155de43f2fff916a6d&v=4" width="32"></a> | user4<br/>   | [1h 10m](https://app.flowwer.dev/charts/review-time/~(u~(i~'22354725~n~'user4)~r~(~(d~'qcp8po~t~'38r))))<br/>▀▀▀▀▀                                                                                                                           | 1<br/>▀            | 0<br/>               |`;

describe('Interactors | .buildTable', () => {
  const input = global.TestUtils.data.reviewersWithStats;

  it('returns all available reviewers in a set of pull requests', () => {
    const response = buildTable(input, { disableLinks: true });

    expect(response).toEqual(SIMPLE_RESPONSE);
  });

  it('can add charts to the table', () => {
    const response = buildTable(input, { displayCharts: true, disableLinks: true });

    expect(response).toEqual(CHARTS_RESPONSE);
  });

  it('support sort by other column', () => {
    const response = buildTable(input, { sortBy: 'COMMENTS', disableLinks: true });

    expect(response).toEqual(SORTED_RESPONSE);
  });

  it('with links enabled by default', () => {
    const response = buildTable(input);

    expect(response).toEqual(LINKS_RESPONSE);
  });

  it('with links and charts', () => {
    const response = buildTable(input, { displayCharts: true });

    expect(response).toEqual(LINKS_AND_CHARTS_RESPONSE);
  });
});
