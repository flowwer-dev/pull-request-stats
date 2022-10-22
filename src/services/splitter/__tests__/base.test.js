const BaseSplitter = require('../base');

describe('Services | Splitter | BaseSplitter', () => {
  describe('constructor', () => {
    it('receives message and limit on constructor', () => {
      const limit = 100;
      const message = 'Some message';
      const splitter = new BaseSplitter({ message, limit });
      expect(splitter.limit).toEqual(limit);
      expect(splitter.message).toEqual(message);
    });

    it('assigns a default limit when not specified', () => {
      const splitter = new BaseSplitter({ message: '' });
      expect(splitter.limit).toEqual(BaseSplitter.defaultLimit());
    });
  });
});
