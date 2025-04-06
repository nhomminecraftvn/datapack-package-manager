module.exports = class Argv {
    constructor() {}

    /**
     * @param {string|number} value
     */
    includes(value) {
        return process.argv.includes(value);
    }

    slice(data) {
        var sliceRange = data;
        return process.argv[sliceRange];
    }

    toString() {
        return process.argv.toString();
    }
}