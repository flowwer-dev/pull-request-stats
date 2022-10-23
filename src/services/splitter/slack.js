const { getSlackCharsLimit } = require('../../config');
const { median } = require('../../utils');
const BaseSplitter = require('./base');

class SlackSplitter extends BaseSplitter {
  static defaultLimit() {
    return getSlackCharsLimit();
  }

  static splitBlocks(message, count) {
    const { blocks } = message;
    const firsts = blocks.slice(0, count);
    const lasts = blocks.slice(count);
    return [{ blocks: firsts }, { blocks: lasts }];
  }

  static calculateSize(message) {
    return JSON.stringify(message).length;
  }

  static getBlocksCount(message) {
    return message.blocks.length;
  }

  static calculateSizePerBlock(message) {
    const blockLengths = message
      .blocks
      .filter(({ type }) => type === 'section')
      .map((block) => this.calculateSize(block));

    return Math.ceil(median(blockLengths));
  }
}

module.exports = SlackSplitter;
