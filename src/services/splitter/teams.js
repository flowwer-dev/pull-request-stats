const { getTeamsBytesLimit } = require('../../config');
const { median } = require('../../utils');
const BaseSplitter = require('./base');

class TeamsSplitter extends BaseSplitter {
  static defaultLimit() {
    return getTeamsBytesLimit();
  }

  static splitBlocks(body, count) {
    const firsts = body.slice(0, count);
    const lasts = body.slice(count);
    return [firsts, lasts];
  }

  static calculateSize(body) {
    return Buffer.byteLength(JSON.stringify(body));
  }

  static getBlocksCount(body) {
    return body.length;
  }

  static calculateSizePerBlock(body) {
    const blockLengths = body
      .filter(({ type }) => type === 'ColumnSet')
      .map((block) => this.calculateSize(block));

    return Math.ceil(median(blockLengths));
  }
}

module.exports = TeamsSplitter;
