
const SSEExpress = require('sse-express');


const App = require('./modules/App');
const Crypto = require('./modules/Crypto');

const Info = require('./modules/Info');
const Terminal = require('./modules/Terminal');
const Log = require('./modules/Log');
const Server = require('./modules/Server');
const Project = require('./modules/Project');
const HtmlTree = require('./modules/HtmlTree');
const Less = require('./modules/Less');
const JS = require('./modules/JS');

const ModuleSystem = require('./modules/ModuleSystem');
const FileSystem = require('./modules/FileSystem');



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
    *       allowHosts: ['localhost', '127.0.0.1',],
    *       statics: ['/', '/htdocs', '/build'],
    *       qrcode: {},
    *       session: {},
    *       stat: {},
    *       master: {},
    *   };
    */
    start(app, opt) {
        let {
            host,
            port,
            api,
            sse,
            allowCrossOrigin,
            allowHosts = [],
            stat,
            master,

            watch,
            statics,
            qrcode,
            session,
        } = opt;


        let { dir, } = stat;
        let info = Info.parse({ api, sse, host, port, });

        App.init(app, { allowCrossOrigin, allowHosts, });


        App.bind(app, info.api, {
            'Server': {
                module: Server,
                defaults: { host, port, statics, qrcode, session, allowCrossOrigin, allowHosts, info, },
                get: ['get',],
            },

            'Project': {
                module: Project,
                defaults: { watch, },
                get: ['get',],
            },

            'FileSystem': {
                module: FileSystem,
                defaults: { dir, },
                get: ['list'],
                post: ['read', 'delete',],
            },

            'ModuleSystem': {
                module: ModuleSystem,
                defaults: { stat, },
                get: ['parse',],
            },

            'HtmlTree': {
                module: HtmlTree,
                defaults: { master, },
                get: ['parse',],
            },

            'Log': {
                module: Log,
                get: ['stat', 'get', 'clear',],
            },

            'Crypto': {
                module: Crypto,
                post: ['md5',],
            },

            'Less': {
                module: Less,
                defaults: { dir, },
                post: ['compile',],
            },

            'JS': {
                module: JS,
                post: ['minify',],
            },
        });


        App.bind(app, info.sse, {
            'Terminal': {
                module: Terminal,
                plugin: SSEExpress(),
                get: ['exec',],
            },
            'Log': {
                module: Log,
                plugin: SSEExpress(),
                get: ['watch',],
            },
        });





        return info;


    },
};

