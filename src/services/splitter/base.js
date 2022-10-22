class BaseSplitter {
  constructor({ message, limit = null }) {
    this.limit = limit || this.constructor.defaultLimit();
    this.message = message;
  }

  static defaultLimit() {
    return Infinity;
  }

  get blockSize() {
    if (!this.blockSizeMemo) this.blockSizeMemo = Math.max(1, this.getSizePerBlock());
    return this.blockSizeMemo;
  }

  get chunks() {
    if (!this.chunksMemo) this.chunksMemo = this.split([], this.message);
    return this.chunksMemo;
  }

  static split(prev, message) {
    const blocksToSplit = this.calculateBlocksToSplit(message);
    if (!blocksToSplit) return [...prev, message];
    const [first, last] = this.splitBlocks(message, blocksToSplit);
    return this.split([...prev, first], last);
  }

  static calculateBlocksToSplit(msg) {
    const blocksCount = this.getBlocksCount(msg);
    const currentSize = this.calculateSize(msg);
    const diff = currentSize - this.limit;
    if (diff < 0 || blocksCount === 1) return 0;

    const blocksSpace = Math.ceil(diff / this.blockSize);
    const blocksToSplit = Math.max(1, Math.min(blocksCount - 1, blocksSpace));
    const [firsts] = this.splitBlocks(msg, blocksToSplit);
    return this.calculateBlocksToSplit(firsts) || blocksToSplit;
  }

  static splitBlocks(...) {
    throw new Error('Not implemented');
  }
}

module.exports = BaseSplitter;
