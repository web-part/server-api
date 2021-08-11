


module.exports = exports = {

    data: null,

    /**
    * 获取静态目录列表。
    */
    get: function (req, res) {
        try {
            res.success(exports.data);
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

