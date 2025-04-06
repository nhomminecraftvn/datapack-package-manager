const fs = require("fs");

const Argv = require('../utils/argv');
const CommandLibrary = require('../utils/commandLib');
const argv = new Argv();
var cmdLib = new CommandLibrary();

module.exports.package = function package() {
    const pack_name = argv.slice(3),
        pack_format = argv.slice(4),
        description = argv.slice(5),
        pack_data = argv.slice(6),
        pack_author = argv.slice(7),
        pack_version = argv.slice(8);

    try {
        if (pack_name && parseInt(pack_format) && description && pack_data && pack_version) cmdLib.initializePackage(pack_name, pack_format, description, pack_data, pack_author, pack_version);
        else if (pack_name == undefined) throw `Missing <pack_name>`;
        else if (pack_format == undefined) throw `Missing <pack_format>`;
        else if (description == undefined) throw `Missing <description>`;
        else if (pack_data == undefined) throw `Missing <pack_data>`;
        else if (pack_version == undefined) throw `Missing <version>`;
        else if (!parseInt(pack_format)) throw `"${pack_format}" it's not a number`;
    } catch (expection) {
        console.log(expection)
    }
}