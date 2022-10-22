// const { getSlackCharsLimit } = require('../../config');
// const { median } = require('../../utils');

// class SlackSplitter {
//   static defaultLimit() {
//     return getSlackCharsLimit();
//   }

//   // Slack
//   static splitBlocks(message, count) {
//     const { blocks } = message;
//     const firsts = blocks.slice(0, count);
//     const lasts = blocks.slice(count);
//     return [{ blocks: firsts }, { blocks: lasts }];
//   }

//   static calculateSize(message) {
//     return JSON.stringify(message).length;
//   }

//   static getBlocksCount(message) {
//     return message.blocks.length;
//   }

//   static getSizePerBlock(message) {
//     const blockLengths = message
//       .blocks
//       .filter(({ type }) === 'section')
//       .map((block) => this.calculateSize(block));

//     return Math.round(median(blockLengths));
//   }
// }
