class BaseSplitter {
  constructor({ message, limit = null, maxBlocksLength = null }) {
    this.message = message;
    this.limit = limit || Infinity;
    this.maxBlocksLength = maxBlocksLength || Infinity;
  }

  get blockSize() {
    if (!this.blockSizeMemo) {
      this.blockSizeMemo = Math.max(1, this.constructor.calculateSizePerBlock(this.message));
    }
    return this.blockSizeMemo;
  }

  get chunks() {
    if (!this.chunksMemo) this.chunksMemo = this.split([], this.message);
    return this.chunksMemo;
  }

  split(prev, message) {
    const blocksToSplit = this.calculateBlocksToSplit(message);
    if (!blocksToSplit) return [...prev, message];
    const [first, last] = this.constructor.splitBlocks(message, blocksToSplit);
    return this.split([...prev, first], last);
  }

  calculateBlocksToSplit(message) {
    const blocksCount = this.constructor.getBlocksCount(message);
    const currentSize = this.constructor.calculateSize(message);
    const diff = currentSize - this.limit;
    const onLimit = diff <= 0 && blocksCount <= this.maxBlocksLength;
    if (onLimit || blocksCount === 1) return 0;

    const blocksSpace = Math.ceil(diff / this.blockSize);
    const upperBound = Math.min(blocksCount - 1, blocksSpace);
    const exceedingBlocks = Math.max(0, blocksCount - this.maxBlocksLength);
    const blocksToSplit = Math.max(1, upperBound, exceedingBlocks);
    const [firsts] = this.constructor.splitBlocks(message, blocksToSplit);
    return this.calculateBlocksToSplit(firsts) || blocksToSplit;
  }

  static splitBlocks() {
    throw new Error('Not implemented');
  }

  static calculateSize() {
    throw new Error('Not implemented');
  }

  static getBlocksCount() {
    throw new Error('Not implemented');
  }

  static calculateSizePerBlock() {
    throw new Error('Not implemented');
  }
}

module.exports = BaseSplitter;
