const fs = require("fs");
const { updated_at } = require('../parameter/date');

const Argv = require('../utils/argv');
const CommandLibrary = require('../utils/commandLib');
const argv = new Argv();
var cmdLib = new CommandLibrary();

module.exports.runPackageBuild = function runPackageBuild() {
    const pack_name = argv.slice(3),
        pack_version = argv.slice(4);

    if (pack_name && pack_version) {
      cmdLib.buildCommand(pack_name, pack_version);
    } else if (pack_name == undefined) throw `Missing <pack_name>`;
      else if (pack_version == undefined) throw `Missing <pack_version>`;
};
