const fs = require("fs");

const { created_at, updated_at } = require('../parameter/date');
const CliError = require('./error');
const cliError = new CliError();

module.exports = class CommandLibrary {
    // require constructor
    constructor() { }

    /**
     * @since v1.0.1
     * 
     * Initialize a Package using: ``dppm init <1-6 args>``
     */
    initializePackage(pack_name, pack_format, description, pack_data, author, version) {
        const mcmetaTemplate = `{"pack":{"pack_format":${pack_format},"description":"${description}"}}`;

        const jsPackStats = `// This package information configure in package: ${pack_name}.
var package = {
    pack_name: "${pack_name}",
    pack_format: ${pack_format},
    pack_description: "${description}",
    pack_author: "${author}",
    pack_version: "${version}",
    created_at: "${created_at}",
}`;

        const jsonLoadTemplate = `{
    "replace": false,
    "values": [
        "${pack_data}:reload"
    ]
}`;

        const jsonTickTemplate = `{
    "replace": false,
    "values": [
        "${pack_data}:repeat"
    ]
}`

        var pack_formatRange = pack_format;

        if (pack_format > 3) {
            fs.mkdirSync(pack_name);
            fs.writeFileSync(`${pack_name}/` + "pack.mcmeta", mcmetaTemplate, { flags: "w+" });
            fs.writeFileSync(`${pack_name}/` + "dppm_package.js", jsPackStats, { flags: "w+" });

            fs.mkdirSync(`${pack_name}/data`);
            fs.mkdirSync(`${pack_name}/data/minecraft`);
            fs.mkdirSync(`${pack_name}/data/minecraft/tags`);

            fs.mkdirSync(`${pack_name}/data/${pack_data}`);

            if (pack_formatRange >= 4 && pack_formatRange <= 48) {
                fs.mkdirSync(`${pack_name}/data/minecraft/tags/functions`);
                fs.mkdirSync(`${pack_name}/data/${pack_data}/functions`);

                fs.writeFileSync(`${pack_name}/data/minecraft/tags/functions/load.json`, jsonLoadTemplate, { flag: "w+" });
                fs.writeFileSync(`${pack_name}/data/minecraft/tags/functions/tick.json`, jsonTickTemplate, { flag: "w+" });

                fs.writeFileSync(`${pack_name}/data/${pack_data}/functions/reload.mcfunction`, "", { flag: "w+" });
                fs.writeFileSync(`${pack_name}/data/${pack_data}/functions/repeat.mcfunction`, "", { flag: "w+" });
            } else if (pack_formatRange >= 49) {
                fs.mkdirSync(`${pack_name}/data/minecraft/tags/function`);
                fs.mkdirSync(`${pack_name}/data/${pack_data}/function`);

                fs.writeFileSync(`${pack_name}/data/minecraft/tags/function/load.json`, jsonLoadTemplate, { flag: "w+" });
                fs.writeFileSync(`${pack_name}/data/minecraft/tags/function/tick.json`, jsonTickTemplate, { flag: "w+" });

                fs.writeFileSync(`${pack_name}/data/${pack_data}/function/reload.mcfunction`, "", { flag: "w+" });
                fs.writeFileSync(`${pack_name}/data/${pack_data}/function/repeat.mcfunction`, "", { flags: "w+" });
            }
        } else {
            // not supported for Minecraft 1.12.2 if pack_format less than 4.
            throw `"pack_format: ${pack_formatRange}" datapack has not supported for Minecraft 1.12.2 or older`;
        }
    }

    /**
     * @since v1.0.1
     * 
     * Add a functions file from from Minecraft 1.13 to 1.20.4
     */
    addFunctions(pack_name, pack_data, function_name) {
        try {
            if (fs.readdirSync(`${pack_name}`)) {
                if (fs.readdirSync(`${pack_name}/data/${pack_data}/functions`)) {
                    fs.writeFileSync(`${pack_name}/data/${pack_data}/functions/${function_name}.mcfunction`, "", { flag: "w+" })
                }
            }
        } catch (expection) {
            // console.log(`Add Function failed with error: ${expection.message}`)
            throw cliError.addFunctionError(pack_name, expection.message);
        }
    }

    /**
     * @since v1.0.1
     * 
     * Add a function file from Minecraft >=1.21
     */
    addFunction(pack_name, pack_data, function_name) {
        try {
            if (fs.readdirSync(`${pack_name}`)) {
                if (fs.readdirSync(`${pack_name}/data/${pack_data}/function`)) {
                    fs.writeFileSync(`${pack_name}/data/${pack_data}/function/${function_name}.mcfunction`, "", { flag: "w+" })
                }
            }
        } catch (expection) {
            console.log(`Add Function failed with error: ${expection.message}`)
            throw cliError.addFunctionError(pack_name, expection.message);
        }
    }

    /**
     * @since v1.0.1
     * 
     * Build a Datapacks
     */
    buildCommand(pack_name, version) {
            var jsonTemplate = `{
    "build": {
        "latest_build": "${updated_at}",
        "version": "${version}"
    }
}`
        try {
            if (fs.readdirSync(`${pack_name}/`) && fs.readFileSync(`${pack_name}/dppm_package.js`)) {
                fs.writeFileSync(`${pack_name}/` + "dppm_build.json", jsonTemplate, { flags: "w+", });
                console.log("Build Completed");
                return true;
            }
        } catch (expection) {
            console.log(`no dppm_package.js found on package: ${pack_name}, build failed`);
            return false;
        }

    }

    removePackage(pack_name) {
        try {
            if (fs.readdirSync(`${pack_name}`)) {
                if (fs.readFileSync(`${pack_name}/dppm_package.js`)) fs.unlinkSync(`${pack_name}/dppm_package.js`); 
                else if (fs.readFileSync(`${pack_name}/dppm_build.json`)) fs.unlinkSync(`${pack_name}/dppm_build.json`);
            }
        } catch (expection) {}
    }
}