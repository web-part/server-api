
const console = require('@webpart/console');
const Watcher = require('./Log/Watcher');



module.exports = {

    stat(req, res) {
        let stat = console.stat();
        return stat;
    },

    /**
    * 获取全部列表。
    */
    get(req, res) {
        let { date, } = req.query;
        let list = console.read(date);

        return list;
    },

    
    /**
    *
    */
    clear(req, res) {
        console.clear();
        let stat = console.stat();
        return stat;
    },

    /**
    *
    */
    watch(req, res) {

        Watcher.watch(req, function (type, list) {
            
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

