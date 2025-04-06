const fs = require("fs");

const Argv = require('../utils/argv');
const CommandLibrary = require('../utils/commandLib');
const argv = new Argv();
const cmdLib = new CommandLibrary();

module.exports.addFunction = function addFunction() {
    const pack_name = argv.slice(3),
        pack_data = argv.slice(4),
        function_name = argv.slice(5),
        pack_formatRange = argv.slice(6);

    if ((pack_name && pack_data && function_name) && pack_formatRange) {
        if (pack_formatRange < 3) throw `"pack_format: ${pack_formatRange}" datapack has not supported for Minecraft 1.12.2 (2017) or older`;
        else if (pack_formatRange >= 4 && pack_formatRange <= 48) cmdLib.addFunctions(pack_name, pack_data, function_name);
        else cmdLib.addFunction(pack_name, pack_data, function_name);
    } else if (pack_name == undefined) {
        throw `Missing <pack_name>`;
    } else if (pack_data == undefined) {
        throw `Missing <pack_data>`;
    } else if (function_name == undefined) {
        throw `Missing <function_name>`;
    } else if (pack_formatRange == undefined) {
        throw `Missing <pack_formatRange>`;
    }
}