const { Cli } = require('./cli')
const { help } = require('./command/help');
const print = require('./utils/print');
const Argv = require('./utils/argv');
const argv = new Argv();

var type = argv.slice(1),
    commandName = argv.slice(2);

module.exports = function CLI() {
    try {
        if (type && commandName) {
            Cli.incCmd(commandName);
        } else if (type) {
            print(help.list());
        }
    } catch (expection) {
        console.log(expection);
    }
}