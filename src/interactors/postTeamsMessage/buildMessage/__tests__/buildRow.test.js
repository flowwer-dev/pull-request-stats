const buildRow = require('../buildRow');
const { table } = require('../../../../../tests/mocks');

const [row] = table.rows;
const defaultParams = {
  row,
};

const extractData = (response) => {
  const [usernameCol, ...statsCols] = response?.columns || [];
  const [imageCol, nameCol] = usernameCol?.items?.[0].columns || [];
  const stats = statsCols.map((col) => col?.items?.[0].text);

  return {
    avatarUrl: imageCol?.items?.[0]?.url,
    login: nameCol?.items?.[0]?.text,
    stats,
  };
};

describe('Interactors | postTeamsMessage | .buildRow', () => {
  const expectedContent = {
    avatarUrl: 'https://avatars.githubusercontent.com/u/user1',
    login: 'user1 🥇',
    stats: [
      '4',
      '[34m](https://app.flowwer.dev/charts/review-time/1)',
      '1',
      '0.25',
      '7',
    ],
  };

  describe('simplest case', () => {
    it('builds a reviewers with basic config', () => {
      const response = buildRow({ ...defaultParams });
      expect(extractData(response)).toEqual(expectedContent);
    });
  });

  describe('removing emoji', () => {
    it('does not add a medal to the username', () => {
      const rowCopy = { ...row };
      rowCopy.user.emoji = null;

      const response = buildRow({ ...defaultParams, row: rowCopy });
      expect(extractData(response)).toEqual({
        ...expectedContent,
        login: 'user1',
      });
    });
  });
});
