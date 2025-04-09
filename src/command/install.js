const fs = require("fs");

const Argv = require('../utils/argv');
const CommandLibrary = require('../utils/commandLib');
const argv = new Argv();
const cmdLib = new CommandLibrary();

module.exports = function addFunction() {
    const pack_name = argv.slice(3);

    try {
        if (pack_name) {
            cmdLib.addFunctions(pack_name);
        } else if (pack_name == undefined) throw `Missing <pack_name>`;
    } catch (expection) {
        console.log(expection);
    }
}