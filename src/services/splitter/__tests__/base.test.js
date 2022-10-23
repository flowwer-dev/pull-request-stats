const BaseSplitter = require('../base');

describe('Services | Splitter | BaseSplitter', () => {
  describe('.constructor', () => {
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

  describe('.defaultLimit', () => {
    it('returns the highest possible number', () => {
      expect(BaseSplitter.defaultLimit()).toEqual(Infinity);
    });
  });

  describe('.splitBlocks', () => {
    it('throws "not implemented" error', () => {
      expect(() => BaseSplitter.splitBlocks()).toThrow(Error, 'Not implemented');
    });
  });

  describe('.calculateSize', () => {
    it('throws "not implemented" error', () => {
      expect(() => BaseSplitter.calculateSize()).toThrow(Error, 'Not implemented');
    });
  });

  describe('.getBlocksCount', () => {
    it('throws "not implemented" error', () => {
      expect(() => BaseSplitter.getBlocksCount()).toThrow(Error, 'Not implemented');
    });
  });

  describe('.calculateSizePerBlock', () => {
    it('throws "not implemented" error', () => {
      expect(() => BaseSplitter.calculateSizePerBlock()).toThrow(Error, 'Not implemented');
    });
  });

  describe('#blockSize', () => {
    const originalCalculateSize = BaseSplitter.calculateSizePerBlock;
    const calculateSize = jest.fn();

    beforeAll(() => {
      BaseSplitter.calculateSizePerBlock = calculateSize;
    });

    afterAll(() => {
      BaseSplitter.calculateSizePerBlock = originalCalculateSize;
    });

    const mockCalculateSize = (value) => {
      calculateSize.mockClear();
      calculateSize.mockReturnValue(value);
    };

    it('returns the calculated size per block', () => {
      const size = 10;
      mockCalculateSize(size);

      const splitter = new BaseSplitter({ message: '' });
      expect(splitter.blockSize).toEqual(size);
    });

    it('returns at least 1 when the calculated is less', () => {
      const size = -5;
      mockCalculateSize(size);

      const splitter = new BaseSplitter({ message: '' });
      expect(splitter.blockSize).toEqual(1);
    });

    it('memoizes the value', () => {
      const size = 3;
      mockCalculateSize(size);

      const splitter = new BaseSplitter({ message: '' });

      // Called multiple times to test memoization
      expect(splitter.blockSize).toEqual(3);
      expect(splitter.blockSize).toEqual(3);
      expect(splitter.blockSize).toEqual(3);
      expect(calculateSize).toBeCalledTimes(1);
    });
  });

  describe('#chunks', () => {
    const buildBlock = (str, length) => `${str}`.padEnd(length, '.');

    const originalSplitBlocks = BaseSplitter.splitBlocks;
    const originalCalculateSize = BaseSplitter.calculateSize;
    const originalGetBlocksCount = BaseSplitter.getBlocksCount;
    const originalCalculateSizePerBlock = BaseSplitter.calculateSizePerBlock;

    const splitBlocks = (msg, count) => {
      const firsts = msg.slice(0, count);
      const lasts = msg.slice(count);
      return [firsts, lasts];
    };

    const calculateSize = (msg) => msg.join('').length;

    const getBlocksCount = (msg) => msg.length;

    const calculateSizePerBlock = (msg) => Math.round(calculateSize(msg) / getBlocksCount(msg));

    const block1 = buildBlock('BLOCK 1', 15);
    const block2 = buildBlock('BLOCK 2', 15);
    const block3 = buildBlock('BLOCK 3', 120);
    const block4 = buildBlock('BLOCK 4', 60);
    const block5 = buildBlock('BLOCK 5', 50);
    const block6 = buildBlock('BLOCK 6', 10);
    const block7 = buildBlock('BLOCK 7', 10);
    const message = [
      block1,
      block2,
      block3,
      block4,
      block5,
      block6,
      block7,
    ];

    beforeAll(() => {
      BaseSplitter.splitBlocks = splitBlocks;
      BaseSplitter.calculateSize = calculateSize;
      BaseSplitter.getBlocksCount = getBlocksCount;
      BaseSplitter.calculateSizePerBlock = calculateSizePerBlock;
    });

    afterAll(() => {
      BaseSplitter.splitBlocks = originalSplitBlocks;
      BaseSplitter.calculateSize = originalCalculateSize;
      BaseSplitter.getBlocksCount = originalGetBlocksCount;
      BaseSplitter.calculateSizePerBlock = originalCalculateSizePerBlock;
    });

    it('returns a single chunk when limit is too large', () => {
      const limit = Infinity;
      const splitter = new BaseSplitter({ message, limit });
      const result = splitter.chunks;
      expect(result).toEqual([
        [...message],
      ]);
    });

    it('returns one chunk per block when limit is too small', () => {
      const limit = 1;
      const splitter = new BaseSplitter({ message, limit });
      const result = splitter.chunks;
      expect(result).toEqual([
        [block1],
        [block2],
        [block3],
        [block4],
        [block5],
        [block6],
        [block7],
      ]);
    });

    it('distributes message in chunks to avoid passing the limit', () => {
      const limit = 100;
      const splitter = new BaseSplitter({ message, limit });
      const result = splitter.chunks;
      expect(result).toEqual([
        [block1, block2],
        [block3],
        [block4],
        [block5, block6, block7],
      ]);
    });
  });
});
