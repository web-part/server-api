

const console = require('@webpart/console');
const Watcher = require('./Log/Watcher');



module.exports = {


    /**
    * 获取全部列表。
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

    /**
    *
    */
    watch: function (req, res) {

        Watcher.watch(req, res, function (res, type, list) {
            
            try {
                //避免换行。 因为换行在 sse 的格式里有特殊含义。
                let json = JSON.stringify(list);

                res.sse({
                    'event': type,
                    'data': json,
                });
            }
            catch (ex) {
                res.error(ex);
            }
        });


    },




};

