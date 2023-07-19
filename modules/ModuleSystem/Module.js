
const { Module, } = require('@webpart/stat');


module.exports = {

    parse(config) {
        let { dir, module, } = config;
        let file$info = Module.parse(dir, module);

        return {
            dir,
            ...module,
            file$info,
        };

    },
};