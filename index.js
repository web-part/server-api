
const SSEExpress = require('sse-express');

const Router = require('./lib/Router');
const BodyParser = require('./modules/BodyParser');
const Path = require('./modules/Path');
const FileList = require('./modules/FileList');
const Stat = require('./modules/Stat');
const MD5 = require('./modules/MD5');
const Terminal = require('./modules/Terminal');
const Log = require('./modules/Log');
const Server = require('./modules/Server');
const Project = require('./modules/Project');
const HtmlTree = require('./modules/HtmlTree');
const Less = require('./modules/Less');
const JS = require('./modules/JS');



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
    *       statics: [],
    *       qrcode: {},
    *       session: {},
    *       stat: {},
    *       master: {},
    *   };
    */
    start(app, opt) {


        /////////
        console.log(opt.watch)


        let { stat, allowCrossOrigin, } = opt;
        let info = Path.get(opt);

        if (allowCrossOrigin) {
            app.use(function (req, res, next) {
                res.set({ 'Access-Control-Allow-Origin': '*', });
                next();
            });
        }

        BodyParser.use(app);


        Stat.data = stat;

        HtmlTree.data = {
            'master': opt.master,
        };

        Server.data = { opt, info, };
        Project.data = { opt, };

        FileList.data = {
            'root': stat.htdocs,
            'url': info.url,
        };

        MD5.data = {
            'root': stat.htdocs,
        };

        Less.data = {};
        JS.data = {};


        bindRouter('Server', ['get']);
        bindRouter('Project', ['get']);
        bindRouter('FileList', ['get', 'read'], ['delete', 'write']);
        bindRouter('Stat', ['get']);
        bindRouter('MD5', ['get']);
        bindRouter('Log', ['get', 'clear']);
        bindRouter('HtmlTree', ['parse']);
        bindRouter('Less', [], ['compile']);
        bindRouter('JS', [], ['minify']);
        bindRouter('Crypto', [], ['md5',]);

        app.get(`${info.sse}/Terminal.exec`, SSEExpress(), function (req, res, next) {
            Terminal.exec(req, res);
        });

        app.get(`${info.sse}/Log.watch`, SSEExpress(), function (req, res, next) {
            Log.watch(req, res);
        });


        function bindRouter(module, gets, posts) {
            Router.use(app, {
                'module': module,
                'base': `${info.api}/${module}.`,
                'get': gets,
                'post': posts,
            });
        }

        return info;


    },
};

