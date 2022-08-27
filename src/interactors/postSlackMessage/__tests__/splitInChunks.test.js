// const { getSlackCharsLimit } = require('../../../config');
const splitInChunks = require('../splitInChunks');

const buildBlock = (str, length) => `${str}`.padEnd(length, '.');

jest.mock('../../../config', () => ({
  getSlackCharsLimit: () => 100,
}));

describe('Interactors | .postSlackMessage | .splitInChunks', () => {
  it('wraps block in array when length is ok', () => {
    const block1 = buildBlock('BLOCK 1', 10);
    const message = {
      blocks: [block1],
    };
    const expectedChunks = [message];
    const result = splitInChunks(message);
    expect(result).toEqual(expectedChunks);
  });

  it('divides block in chunks when above length, keeping order', () => {
    const block1 = buildBlock('BLOCK 1', 15);
    const block2 = buildBlock('BLOCK 2', 15);
    const block3 = buildBlock('BLOCK 3', 120);
    const block4 = buildBlock('BLOCK 4', 60);
    const block5 = buildBlock('BLOCK 5', 50);
    const block6 = buildBlock('BLOCK 6', 10);
    const block7 = buildBlock('BLOCK 7', 10);
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
    const expectedChunks = [
      { blocks: [block1, block2] },
      { blocks: [block3] },
      { blocks: [block4] },
      { blocks: [block5, block6, block7] },
    ];
    const result = splitInChunks(message);
    expect(result).toEqual(expectedChunks);
  });
});
