const path = require('path');

global.TestUtils = require('./utils');
global.ROOT_PATH = path.join(__dirname, './../');

process.on('unhandledRejection', trace => console.log(trace));
