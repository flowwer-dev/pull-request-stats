const { getSlackCharsLimit } = require('../../config');
const { median } = require('../../utils');

const CHARS_LIMIT = getSlackCharsLimit();

const getSize = (obj) => JSON.stringify(obj).length;

const getBlockLengths = (blocks) => blocks
  .filter(({ type }) => type === 'section') // Ignoring "divider" blocks
  .map((block) => getSize(block));

const getSizePerBlock = (blocks) => Math.round(median(getBlockLengths(blocks)));

module.exports = (message) => {
  const blockSize = Math.max(1, getSizePerBlock(message.blocks));

  const getBlocksToSplit = (blocks) => {
    const currentSize = getSize({ blocks });
    const diff = currentSize - CHARS_LIMIT;
    if (diff < 0 || blocks.length === 1) return 0;

    const blocksSpace = Math.ceil(diff / blockSize);
    const blocksCount = Math.max(1, Math.min(blocks.length - 1, blocksSpace));
    const firsts = blocks.slice(0, blocksCount);
    return getBlocksToSplit(firsts) || blocksCount;
  };

  const getChunks = (prev, msg) => {
    const blocksToSplit = getBlocksToSplit(msg.blocks);
    if (!blocksToSplit) return [...prev, msg];
    const blocks = msg.blocks.slice(0, blocksToSplit);
    const others = msg.blocks.slice(blocksToSplit);
    return getChunks([...prev, { blocks }], { blocks: others });
  };

  return getChunks([], message);
};
