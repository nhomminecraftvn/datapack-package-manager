const fs = require("fs");
const { updated_at } = require('../parameter/date');

module.exports.runPackageBuild = function runPackageBuild(pack_name, version) {
    var jsonTemplate = `{
  "build": {
    "latest_build": "${updated_at}",
    "version": "${version}"
  }
}`

    try {
        if (fs.readdirSync(`${pack_name}/`) && fs.readFileSync(`${pack_name}/dppm_package.js`)) {
          fs.writeFileSync(`${pack_name}/` + "dppm_build.json", jsonTemplate, {flags: "w+",});

            console.log("Build Completed:");
            return true;
        }
    } catch (err) {
        console.log(`no dppm_package.js found on package: ${pack_name}, build failed`);
        return false;
    }
};
