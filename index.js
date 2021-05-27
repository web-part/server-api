const BodyParser = require('body-parser');
const SSEExpress = require('sse-express');

const Router = require('./lib/Router');
const Path = require('./modules/Path');
const FileList = require('./modules/FileList');
const Stat = require('./modules/Stat');
const MD5 = require('./modules/MD5');
const Terminal = require('./modules/Terminal');
const Log = require('./modules/Log');

const config = require('./config'); //全局的配置文件。



module.exports = {

  
    /**
    * 启动 API 接口服务。
    * @param {app} app 
    * @param {object} opt 
    *   opt = {
    *       host: 'localhost', //如果不传，则默认为 `localhost`。
    *       port: 3001,
    *       api: '/api',
    *       sse: '/api/sse',
    *       allowCrossOrigin: true,
    *       stat: {},
    *   };
    */
    start(app, opt) {
        let { bodyParser, } = config;
        let { stat, } = opt;
        let { url, api, sse, } = Path.get(opt);

       
        app.use(BodyParser.json(bodyParser.json));
        app.use(BodyParser.urlencoded(bodyParser.urlencoded));


        if (opt.allowCrossOrigin) {
            app.use(function (req, res, next) {
                res.set({ 'Access-Control-Allow-Origin': '*', });
                next();
            });
        }


        FileList.config({
            'root': stat.htdocs,
            'url': url,
        });

        MD5.config({
            'root': stat.htdocs,
        });


        Stat.config(stat);


        Router.use(app, {
            module: 'FileList',
            base: `${api}/FileList.`,
            get: ['get', 'read',],
            post: ['delete',],
        });

        Router.use(app, {
            module: 'Stat',
            base: `${api}/Stat.`,
            get: ['get',],
        });

        Router.use(app, {
            module: 'MD5',
            base: `${api}/MD5.`,
            get: ['get',],
        });

        Router.use(app, {
            module: 'Log',
            base: `${api}/Log.`,
            get: ['get', 'clear',],
        });

        app.get(`${sse}/Terminal.exec`, SSEExpress(), function (req, res, next) {
            Terminal.exec(req, res);
        });

        app.get(`${sse}/Log.watch`, SSEExpress(), function (req, res, next) {
            Log.watch(req, res);
        });

        return { url, api, sse, };


    },
};

