const Argv = require('../utils/argv');
const CommandLibrary = require('../utils/commandLib');
const argv = new Argv();
const print = require('../utils/print');
var cmdLib = new CommandLibrary();

module.exports = function build() {
    const pack_name = argv.slice(3),
        pack_version = argv.slice(4);
  
    try {
        if (pack_name && pack_version) cmdLib.buildCommand(pack_name, pack_version);
        else if (pack_name == undefined) throw `Missing <pack_name>`;
        else if (pack_version == undefined) throw `Missing <pack_version>`;
    } catch (expection) {
        print(expection)
    }
};
