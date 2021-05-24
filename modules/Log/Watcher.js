

const console = require('@webpart/console');
const { Gaze, } = require('gaze');
const Compare = require('./Watcher/Compare');


let meta = {
    watcher: null,      //监控器实例。
    list: [],           //用来存放最新一次的日志列表。
    clients: new Map(), //用来存放客户端的请求。
};


let defaults = {
    debounceDelay: 500,
    maxListeners: 9999,

    /**
    * 监控的轮询时间间隔。 
    * 如果设置得太小而文件数过多，则 CPU 占用很高。 
    * 比如设为 100 时， 2000 多个文件可高达 60%。
    */
    interval: 100,
};


module.exports = {

    watch(req, res, fn) {
        let { file, } = console;

        if (!file) {
            return;
        }

        //添加到客户端列表。
        meta.clients.set(req, { res, fn, });

        //客户端关闭时，需要从列表中移除。
        req.on('close', function () {
            meta.clients.delete(req);
        });


        //已创建.
        if (meta.watcher) {
            return;
        }



        meta.list = console.read();
        meta.watcher = new Gaze(file, defaults);

        meta.watcher.on('changed', function (file) {
            let oldList = meta.list || [];
            let newList = console.read() || [];
            let items = Compare.parse(oldList, newList);

            meta.list = newList;

            if (!items) {
                return;
            }

            let type = items === true ? 'reset' : 'add';
            let list = items === true ? newList : items;

            meta.clients.forEach(({ res, fn }, req) => {
                fn(res, type, list);
            });


        });
    },
};