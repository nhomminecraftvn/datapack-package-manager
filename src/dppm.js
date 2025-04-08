const { Cli } = require('./cli')
const { help } = require('./command/help');
const print = require('./utils/print');
const Argv = require('./utils/argv');
const CliError = require('./utils/error');
const argv = new Argv();
const cliError = new CliError();

var type = argv.slice(1),
    commandName = argv.slice(2);

module.exports = function CLI() {
    if (type && commandName) {
        Cli.incCmd(commandName);
    } else if (type) {
        print(require('./command/help').dppmCommandHelp());
    }
}