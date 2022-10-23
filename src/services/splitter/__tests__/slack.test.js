const SlackSplitter = require('../slack');
const { median } = require('../../../utils');

jest.mock('../../../config', () => ({
  getSlackCharsLimit: () => 100,
}));

describe('Services | Splitter | SlackSplitter', () => {
  const block1 = {
    type: 'section',
    text: 'Some text 1',
  };
  const block2 = { type: 'divider' };
  const block3 = {
    type: 'section',
    text: 'Some text 2',
  };
  const block4 = { type: 'divider' };
  const block5 = {
    type: 'section',
    text: 'Some text 3',
  };
  const block6 = { type: 'divider' };
  const block7 = {
    type: 'section',
    text: 'Some text 4',
  };
  const message = {
    blocks: [
      block1,
      block2,
      block3,
      block4,
      block5,
      block6,
      block7,
    ],
  };

  describe('.defaultLimit', () => {
    it('returns limit from config', () => {
      expect(SlackSplitter.defaultLimit()).toEqual(100);
    });
  });

  describe('.splitBlocks', () => {
    it('splits message in 2 blocks given an index', () => {
      const [results1, results2] = SlackSplitter.splitBlocks(message, 3);
      expect(results1).toEqual({
        blocks: [block1, block2, block3],
      });
      expect(results2).toEqual({
        blocks: [block4, block5, block6, block7],
      });
    });

    it('returns full message as the first split when index is last', () => {
      const [results1, results2] = SlackSplitter.splitBlocks(message, 7);
      expect(results1).toEqual(message);
      expect(results2).toEqual({ blocks: [] });
    });

    it('returns full message as the last split when index is 0', () => {
      const [results1, results2] = SlackSplitter.splitBlocks(message, 0);
      expect(results1).toEqual({ blocks: [] });
      expect(results2).toEqual(message);
    });
  });

  describe('.calculateSize', () => {
    it('returns the length of the message parsed to JSON', () => {
      const result = SlackSplitter.calculateSize(message);
      expect(result > 0).toEqual(true);
      expect(result).toEqual(JSON.stringify(message).length);
    });
  });

  describe('.getBlocksCount', () => {
    it('returns the number of blocks in a message', () => {
      const result = SlackSplitter.getBlocksCount(message);
      expect(result > 0).toEqual(true);
      expect(result).toEqual(message.blocks.length);
    });
  });

  describe('.calculateSizePerBlock', () => {
    it('returns the median size of the blocks with type "section"', () => {
      const size1 = JSON.stringify(block1).length;
      const size2 = JSON.stringify(block3).length;
      const size3 = JSON.stringify(block5).length;
      const size4 = JSON.stringify(block7).length;
      const expected = Math.ceil(median([size1, size2, size3, size4]));
      const result = SlackSplitter.calculateSizePerBlock(message);
      expect(result > 0).toEqual(true);
      expect(result).toEqual(expected);
    });
  });
});
