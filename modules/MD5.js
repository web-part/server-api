

const List = require('./MD5/List');




module.exports = exports = {

    data: null,

    /**
    * 获取全部文件和目录列表。
    */
    get: function (req, res) {
        try {

            let list = List.get(exports.data.root);

            res.success(list);
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

