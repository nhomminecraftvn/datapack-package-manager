var command = {
    help: 'help',
};

var alias = {
    '--h': command.help,
}

var helpCmd = {
    help: 'help',
    init: 'init',
};

module.exports.command = command;
module.exports.alias = alias;
module.exports.helpCmd = helpCmd;