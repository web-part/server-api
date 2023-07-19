

const console = require('@webpart/console');
const { Gaze, } = require('gaze');
const Compare = require('./Watcher/Compare');


let meta = {
    watcher: null,      //监控器实例。
    clients: new Map(), //用来存放客户端的请求。
    list: [],           //用来存放最新一次的日志列表。
};


let defaults = {
    debounceDelay: 500,
    maxListeners: 9999,

    /**
    * 监控的轮询时间间隔。 
    * 如果设置得太小而文件数过多，则 CPU 占用很高。 
    * 比如设为 100 时， 2000 多个文件可高达 60%。
    */
    interval: 200,
};


module.exports = {

    watch(req, fn) {
        let { dir, } = console.defaults;

        if (!dir) {
            return;
        }


        //添加到客户端列表。
        meta.clients.set(req, fn);

        //客户端关闭时，需要从列表中移除。
        req.on('close', function () {
            meta.clients.delete(req);
        });


        //已创建.
        if (meta.watcher) {
            return;
        }


        let file = `${dir}/stat.json`;
        let stat = console.stat();
   
        meta.list = console.read(stat.latest) || [];
        meta.watcher = new Gaze(file, defaults);

        meta.watcher.on('changed', function () {
            let olds = meta.list || [];

            let stat = console.stat();
            let news = meta.list = console.read(stat.latest) || [];

            let items = Compare.parse(olds, news);


            if (!items) {
                return;
            }

            let type = items === true ? 'reset' : 'add';
            let list = items === true ? news : items;

            meta.clients.forEach((fn, req) => {
                fn(type, list);
            });
          


        });
    },
};