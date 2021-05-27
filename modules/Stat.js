
const fs = require('fs');
const { Module, HTML, Analyser, } = require('@webpart/stat');

function parse(config) {
    let { htdocs, } = config;

    let moduleInfos = Module.stat(htdocs, config.module);               //最全面的原始信息。
    let moduleStat = Analyser.stat(moduleInfos);

    let htmlInfos = HTML.stat(htdocs, config.html);
    let htmlStat = Analyser.stat(htmlInfos);


    Object.keys(moduleStat.id$info).forEach((id) => {
        let info = moduleStat.id$info[id];
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

