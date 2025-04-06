const chalk = require("chalk")
const textColor = new chalk.Chalk();

const { version } = require('../../package.json');

module.exports = class CliError {
    constructor() {}

    errClassName = 'CliError';

    /**
     * @param {string} args String Error
     */
    badCommand(args) {
        var errId = "badCommand";
        var errMessage = "Unknown command:"
        var errCode = 1;
        return textColor.red(textColor.bold(`${this.errClassName}.${errId}:`), textColor.white(`${errMessage} "${args}" with error code ${errCode}\n\ndppm v${version}`))
    }

    indexNotFound(index) {
        var errId = "indexNotFound";
        var errMessage = "Unknown index:"
        var errCode = 2;
        return textColor.red(textColor.bold(`${this.errClassName}.${errId}:`), textColor.white(`${errMessage} "${index}" with error code ${errCode}\n\ndppm v${version}`));
    }

    addFunctionError(data) {
        var errId = "addFunctionError";
        var errMessage = "Add Function Failed!"
        var errCode = 3;
        return textColor.red(textColor.bold(`${this.errClassName}.${errId}:`), textColor.white(`${errMessage} "${data}" with error code ${errCode}\n\ndppm v${version}`));
    }

    buildFailed() {

    }

}