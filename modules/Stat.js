
const { Module, HTML, Analyser, } = require('@webpart/stat');

function parse(config) {
    let { htdocs, } = config;

    let moduleInfos = Module.stat(htdocs, config.module);               //最全面的原始信息。
    let moduleStat = Analyser.stat(moduleInfos);

    let htmlInfos = HTML.stat(htdocs, config.html);
    let htmlStat = Analyser.stat(htmlInfos);


    return {
        moduleStat,
        htmlStat,
    };

}




module.exports = exports = {
    data: null,

    /**
    * 获取全部文件和目录列表。
    */
    get: function (req, res) {
        try {

            let stat = parse(exports.data);

            res.success(stat);
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

