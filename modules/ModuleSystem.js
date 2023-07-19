
const Module = require('./ModuleSystem/Module');
const HTML = require('./ModuleSystem/HTML');

module.exports = exports = {
   
    /**
    * 
    */
    parse(req, res, defaults) {
        let { stat, } = defaults;
        let module = Module.parse(stat);
        let html = HTML.parse(stat);

        return { module, html, };

    },


};

