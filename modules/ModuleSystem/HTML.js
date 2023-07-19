
const { HTML, } = require('@webpart/stat');


module.exports = {

    parse(config) {
        let { dir, html, } = config;
        let file$info = HTML.parse(dir, html);

        return {
            dir,
            ...html,
            file$info,
        };

    },
};