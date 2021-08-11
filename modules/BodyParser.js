
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

    use(app) {
        app.use(BodyParser.json(defaults.json));
        app.use(BodyParser.urlencoded(defaults.urlencoded));
    },
};