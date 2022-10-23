const TeamsSplitter = require('../teams');
const { median } = require('../../../utils');

jest.mock('../../../config', () => ({
  getTeamsBytesLimit: () => 5000,
}));

const byteLength = (input) => Buffer.byteLength(JSON.stringify(input));

describe('Services | Splitter | TeamsSplitter', () => {
  const block1 = {
    type: 'ColumnSet',
    text: 'Some text 1',
  };
  const block2 = { type: 'Container' };
  const block3 = {
    type: 'ColumnSet',
    text: 'Some text 2',
  };
  const block4 = { type: 'Container' };
  const block5 = {
    type: 'ColumnSet',
    text: 'Some text 3',
  };
  const block6 = { type: 'Container' };
  const block7 = {
    type: 'ColumnSet',
    text: 'Some text 4',
  };
  const message = [
    block1,
    block2,
    block3,
    block4,
    block5,
    block6,
    block7,
  ];

  describe('.defaultLimit', () => {
    it('returns limit from config', () => {
      expect(TeamsSplitter.defaultLimit()).toEqual(5000);
    });
  });

  describe('.splitBlocks', () => {
    it('splits message in 2 blocks given an index', () => {
      const [results1, results2] = TeamsSplitter.splitBlocks(message, 3);
      expect(results1).toEqual([block1, block2, block3]);
      expect(results2).toEqual([block4, block5, block6, block7]);
    });

    it('returns full message as the first split when index is last', () => {
      const [results1, results2] = TeamsSplitter.splitBlocks(message, 7);
      expect(results1).toEqual(message);
      expect(results2).toEqual([]);
    });

    it('returns full message as the last split when index is 0', () => {
      const [results1, results2] = TeamsSplitter.splitBlocks(message, 0);
      expect(results1).toEqual([]);
      expect(results2).toEqual(message);
    });
  });

  describe('.calculateSize', () => {
    it('returns the length of the message parsed to JSON', () => {
      const result = TeamsSplitter.calculateSize(message);
      expect(result > 0).toEqual(true);
      expect(result).toEqual(byteLength(message));
    });
  });

  describe('.getBlocksCount', () => {
    it('returns the number of blocks in a message', () => {
      const result = TeamsSplitter.getBlocksCount(message);
      expect(result > 0).toEqual(true);
      expect(result).toEqual(message.length);
    });
  });

  describe('.calculateSizePerBlock', () => {
    it('returns the median size of the blocks with type "ColumnSet"', () => {
      const size1 = byteLength(block1);
      const size2 = byteLength(block3);
      const size3 = byteLength(block5);
      const size4 = byteLength(block7);
      const expected = Math.ceil(median([size1, size2, size3, size4]));
      const result = TeamsSplitter.calculateSizePerBlock(message);
      expect(result > 0).toEqual(true);
      expect(result).toEqual(expected);
    });
  });
});
