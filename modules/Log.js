

const console = require('@webpart/console');




module.exports = {


    /**
    * 获取全部文件和目录列表。
    */
    get: function (req, res) {
        try {
            let list = console.read();

            res.success(list);
        }
        catch (ex) {
            res.error(ex);
        }
    },

    /**
    *
    */
    clear: function (req, res) {
        try {
            console.write('');
            res.success([]);
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

