const CliError = require('./utils/error');
const print = require('./utils/print');
const cliError = new CliError();

module.exports.Cli = class Cli {
    static incCmd(cmd) {
        try {
            return require(`./command/${cmd}.js`)();
        } catch (expection) {
            print(cliError.badCommand(cmd));
        }
    }
};
