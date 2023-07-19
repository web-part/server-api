

const BodyParser = require('body-parser');

let defaults = {
    json: {
        limit: '50mb',
    },

    urlencoded: {
        limit: '50mb',
        extended: true,
    },
};



module.exports = {

    init(app) { 
        let { json, urlencoded, } = defaults;
        
        app.use(BodyParser.json(json));
        app.use(BodyParser.urlencoded(urlencoded));
    },
};