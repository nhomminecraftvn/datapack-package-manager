const { help_list } = require('../parameter/help_list');
const help_doc = require('../parameter/help_doc');
const CliError = require('../utils/error');
const print = require('../utils/print')
const Argv = require('../utils/argv');
const argv = new Argv();
const cliError = new CliError();

var helpList = `init, add-function, build`

module.exports = function help() {
    function index() {
        var helpArg = argv.slice(2), 
            index = argv.slice(3);

        try {
            if (helpArg && index) {
                switch (index) {
                    case help_list.init: print(help_doc.init); break;
                    default: throw cliError.indexNotFound(index);
                }
            } else if (helpArg) {
                console.log(list());
            }
        } catch (expection) {
            console.log(expection);
        }
    }

    function list() {
        return helpList;
    }

    index();
}

module.exports.dppmCommandHelp = function dppmCommandHelp() {
    return helpList;
}