const { version } = require('../package.json');
const { help } = require('./command/help');
const { commandImport } = require('./commandImport');
const print = require('./utils/print');
const CliError = require('./utils/error');
const Argv = require('./utils/argv');
const argv = new Argv();
const cliError = new CliError();

var type = argv.toString(1),
    commandName = argv.slice(2);

module.exports = function CLI() {
    try {
        if (type && commandName) {
            includeCommand();
        } else if (type) {
            print(help.list());
        }
    } catch (expection) {
        console.log(expection);
    }
}

function includeCommand() {
    switch (commandName) {
        case 'add-function': commandImport.addFunction.addFunction(); break;
        case 'build': break;
        case 'help': help.index(); break;
        case 'init': commandImport.init.package(); break;
        case 'version': print(version); break;
        default: throw cliError.badCommand(commandName);
    }
}