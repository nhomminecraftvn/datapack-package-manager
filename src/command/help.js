const { helpCmd } = require('../parameter/cmd_list');
const CliError = require('../utils/error');
const Argv = require('../utils/argv');
const argv = new Argv();
const cliError = new CliError();

module.exports.help = class help {
    static index() {
        var helpArg = argv.slice(2), 
            index = argv.slice(3);

        try {
            if (helpArg && index) {
                switch (index) {
                    case helpCmd.init: console.log('ok'); break;
                    default: throw cliError.indexNotFound(index);
                }
            } else if (helpArg) {
                console.log(this.list());
            }
        } catch (expection) {
            console.log(expection);
        }
    }

    static list() {
        return 'init, add-function, build';
    }

    static indexNotFound(index) {
        return `Unknown Index: ${index}`;
    }
}