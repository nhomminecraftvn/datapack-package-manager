const { commandImport } = require('./commandImport');
const { help } = require('./command/help');
const CliError = require('./utils/error');
const print = require('./utils/print');
const cliError = new CliError();

module.exports.Cli = class Cli {
    static package_version() {
        const { version } = require('../package.json');
        return print(version);
    }

    static incCmd(cmd) {
        switch (cmd) {
            case 'add-function': commandImport.addFunction.addFunction(); break;
            case 'build': commandImport.build.runPackageBuild(); break;
            case 'help': help.index(); break;
            case 'init': commandImport.init.package(); break;
            case 'unlink': commandImport.removePackage.removePackagePackage(); break
            case 'version': this.package_version(); break;
            default: throw cliError.badCommand(cmd);
        }
    }
};
