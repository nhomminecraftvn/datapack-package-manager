const fs = require("fs");
const path = require("path");

const { dppmTemplates } = require('../parameter/template/importTemplate');
const { created_at, updated_at } = require('../parameter/date');
const print = require('./print');
const CliError = require('./error');
const cliError = new CliError();

module.exports = class CommandLibrary {
    // require constructor
    constructor() { }

    /**
     * @since v1.0.1
     * 
     * Initialize a Package
     */
    initializePackage(pack_name, pack_format, description, pack_data, author, version) {
        const mcmetaTemplate = `{"pack":{"pack_format":${pack_format},"description":"${description}"}}`;

        const jsPackStats = dppmTemplates.jsPackStats(pack_name, pack_format, description, author, version, created_at);
        const jsonLoadTemplate = dppmTemplates.jsonLoadTemplate(pack_data);
        const jsonTickTemplate = dppmTemplates.jsonTickTemplate(pack_data);

        var pack_formatRange = pack_format;

        if (pack_format > 3) {
            fs.mkdirSync(pack_name);
            fs.writeFileSync(`${pack_name}/` + "pack.mcmeta", mcmetaTemplate);
            fs.writeFileSync(`${pack_name}/` + "dppm_package.js", jsPackStats);

            fs.mkdirSync(`${pack_name}/data`);
            fs.mkdirSync(`${pack_name}/data/minecraft`);
            fs.mkdirSync(`${pack_name}/data/minecraft/tags`);

            fs.mkdirSync(`${pack_name}/data/${pack_data}`);

            if (pack_formatRange >= 4 && pack_formatRange <= 48) {
                fs.mkdirSync(`${pack_name}/data/minecraft/tags/functions`);
                fs.mkdirSync(`${pack_name}/data/${pack_data}/functions`);

                fs.writeFileSync(`${pack_name}/data/minecraft/tags/functions/load.json`, jsonLoadTemplate);
                fs.writeFileSync(`${pack_name}/data/minecraft/tags/functions/tick.json`, jsonTickTemplate);

                fs.writeFileSync(`${pack_name}/data/${pack_data}/functions/reload.mcfunction`, "");
                fs.writeFileSync(`${pack_name}/data/${pack_data}/functions/repeat.mcfunction`, "");
            } else if (pack_formatRange >= 49) {
                fs.mkdirSync(`${pack_name}/data/minecraft/tags/function`);
                fs.mkdirSync(`${pack_name}/data/${pack_data}/function`);

                fs.writeFileSync(`${pack_name}/data/minecraft/tags/function/load.json`, jsonLoadTemplate);
                fs.writeFileSync(`${pack_name}/data/minecraft/tags/function/tick.json`, jsonTickTemplate);

                fs.writeFileSync(`${pack_name}/data/${pack_data}/function/reload.mcfunction`, "");
                fs.writeFileSync(`${pack_name}/data/${pack_data}/function/repeat.mcfunction`, "");
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
        var jsonTemplate = dppmTemplates.buildJsonTemplate(pack_name, version);
        
        try {
            if (fs.readdirSync(`${pack_name}/`) && fs.readFileSync(`${pack_name}/dppm_package.js`)) {
                fs.writeFileSync(`${pack_name}/` + "dppm_build.json", jsonTemplate);
                console.log("Build Completed");
                return true;
            }
        } catch (expection) {
            console.log(`no dppm_package.js found on package: ${pack_name}, build failed`);
            return false;
        }

    }

    /**
     * @since v1.0.1
     * 
     * Remove a package
     */
    removePackage(pack_name) {
        try {
            if (fs.readdirSync(`${pack_name}`)) {
                if (fs.readFileSync(`${pack_name}/dppm_package.js`)) fs.unlinkSync(`${pack_name}/dppm_package.js`); 
                else if (fs.readFileSync(`${pack_name}/dppm_build.json`)) fs.unlinkSync(`${pack_name}/dppm_build.json`);
            }
        } catch (expection) {
            print(cliError.removeError(pack_name, expection.message))
        }
    }

    /**
     * @since v1.0.1
     * 
     * Install a Package
     */
    installPackage(pack_name, dest) {
        const exist = fs.existsSync(pack_name);
        const stats = exist && fs.statSync(pack_name);
        const isDir = stats && stats.isDirectory();
        
        try {
            if (isDir) {
                if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    
                fs.readdirSync(pack_name).forEach(childItemName => {
                    this.installPackage(path.join(pack_name, childItemName), path.join(dest, childItemName));
                })
            } else {
                if (!fs.existsSync(dest)) fs.copyFileSync(pack_name, dest);
            }

            print("Must be reload Datapack in your Minecraft world.")
        } catch (expection) {
            console.log(expection.message);
        } 
    }
}