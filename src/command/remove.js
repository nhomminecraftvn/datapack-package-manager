const fs = require("fs");

const Argv = require('../utils/argv');
const CommandLibrary = require('../utils/commandLib');
const argv = new Argv();
var cmdLib = new CommandLibrary();

module.exports = function remove() {
    const pack_name = argv.slice(3)

    try {
        if (pack_name) {
            cmdLib.removePackage(pack_name);
        } else if (pack_name == undefined) throw `Missing <pack_name>`;
    } catch (expection) {
        console.log(expection)
    }
}