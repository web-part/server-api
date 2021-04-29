
const fs = require('fs');
const $Object = require('@definejs/object');
const { Module, HTML, Analyser, } = require('@webpart/stat');

function parse(config) {
    let { htdocs, } = config;

    let moduleInfos = Module.stat(htdocs, config.module);               //最全面的原始信息。
    let moduleStat = Analyser.stat(moduleInfos);

    let htmlInfos = HTML.stat(htdocs, config.html);
    let htmlStat = Analyser.stat(htmlInfos);

    $Object.each(moduleStat.id$info, (id, info) => { 
        let { file, } = info;
        let stat = fs.statSync(file);

        info.stat = stat;
    });

    return {
        moduleStat,
        htmlStat,
    };

}


const meta = {
    config: null,
};

module.exports = {

    config(config) { 
        meta.config = config;
    },

    /**
    * 获取全部文件和目录列表。
    */
    get: function (req, res) {
        try {

            let stat = parse(meta.config);

            res.success(stat);
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

