const { version } = require('../package.json');
const { init } = require('./command/init');
const { runPackageBuild } = require('./command/build');
const { addFunction } = require("../src/command/addFunction");

module.exports.cli = class cli {
    static get_version() {
        console.log(version);
    }

    static init() {
        init.initPackage();
    }

    static build() {
        const argv = yargs(hideBin(process.argv)).argv;
        const [type, pack_name, version] = argv._;

        if (pack_name && version) {
            runPackageBuild(pack_name, version);
        } else if (!pack_name) {
            throw `Missing <pack_name>`;
        } else if (!version) {
            throw `Missing <version>`;
        }
    }

    static addFunction() {
        const argv = yargs(hideBin(process.argv)).argv;
        const [type, pack_name, pack_data, function_name, pack_formatRange, args,] = argv._;

        if ((pack_name && pack_data && function_name) || pack_formatRange) {
            if (pack_formatRange < 3) {
                throw `"pack_format: ${pack_formatRange}" datapack has not supported for Minecraft 1.12.2 (2017) or older`;
            } else if (pack_formatRange >= 4 && pack_formatRange <= 48) {
                addFunction.getFunctions(pack_name, pack_data, function_name);
            } else if (pack_formatRange >= 49) {
                addFunction.get(pack_name, pack_data, function_name);
            }
        } else if (!pack_name) {
            throw `Missing <pack_name>`;
        } else if (!pack_data) {
            throw `Missing <pack_data>`;
        } else if (!function_name) {
            throw `Missing <function_name>`;
        } else if (!pack_formatRange) {
            throw `Missing <pack_formatRange>`;
        }
    }
};
