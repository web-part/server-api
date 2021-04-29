

const List = require('./MD5/List');


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

            let list = List.get(meta.config.root);

            res.success(list);
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

