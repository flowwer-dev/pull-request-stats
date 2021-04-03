const buildComment = require('../buildComment');

const TABLE_MOCK = 'TABLE';

describe('Interactors | .buildComment', () => {
  const title = '## Pull reviewers stats';

  describe('when period length is 1', () => {
    const periodLength = 1;
    const message = 'Stats for the last day:';

    it('builds the message in singular', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK });
      expect(response).toEqual(expected);
    });
  });

  describe('when period length is more than 1', () => {
    const periodLength = 365;
    const message = 'Stats for the last 365 days:';

    it('builds the message in singular', () => {
      const expected = `${title}\n${message}\n${TABLE_MOCK}`;
      const response = buildComment({ periodLength, table: TABLE_MOCK });
      expect(response).toEqual(expected);
    });
  });
});
