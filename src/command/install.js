const fs = require("fs");

const Argv = require('../utils/argv');
const CommandLibrary = require('../utils/commandLib');
const argv = new Argv();
const cmdLib = new CommandLibrary();

module.exports = function install() {
    const pack_name = argv.slice(3);
    const pack_dest = argv.slice(4);

    try {
        if (pack_name && pack_dest) {
            cmdLib.installPackage(pack_name, pack_dest);  
        } else if (pack_name == undefined) throw `Missing <pack_name>`;
          else if (pack_dest == undefined) throw `Missing <pack_dest>`;
    } catch (expection) {
        console.log(expection);
    }
}