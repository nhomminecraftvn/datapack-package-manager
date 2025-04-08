const package = require('../../package.json');
const print = require('../utils/print');

module.exports = function version() {
    print(package.version);
}