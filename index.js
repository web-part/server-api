const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const Compression = require('compression');
const SSEExpress = require('sse-express');

const Router = require('./lib/Router');
const FileList = require('./modules/FileList');
const Stat = require('./modules/Stat');
const MD5 = require('./modules/MD5');
const Terminal = require('./modules/Terminal');

const config = require('./config'); //全局的配置文件。





module.exports = {

    start(app, opt) {
        let { bodyParser, } = config;
        let { server, stat, } = opt;



        app.use(CookieParser());
        app.use(BodyParser.json(bodyParser.json));
        app.use(BodyParser.urlencoded(bodyParser.urlencoded));

         //使用 gzip 压缩。 这个跟 sse 冲突。
        app.use(Compression({
            filter: function shouldCompress(req, res) {
                //这个接口不要压缩，否则不会自动发送消息给客户端。
                if (req.url.startsWith('/api/sse/')) {
                    // don't compress responses with this request header
                    return false;
                }

                // fallback to standard filter function
                return Compression.filter(req, res);
            }
        }));

        


        app.use(function (req, res, next) {
            res.set({ 'Access-Control-Allow-Origin': '*', });
            next();
        });



        FileList.config({
            'root': stat.htdocs,
            'url': server.networkUrl,
        });

        MD5.config({
            'root': stat.htdocs,
        });


        Stat.config(stat);


        Router.use(app, {
            module: 'FileList',
            base: '/api/FileList.',
            get: ['get', 'read',],
        });

        Router.use(app, {
            module: 'Stat',
            base: '/api/Stat.',
            get: ['get',],
        });

        Router.use(app, {
            module: 'MD5',
            base: '/api/MD5.',
            get: ['get',],
        });

        Router.use(app, {
            module: 'Log',
            base: '/api/Log.',
            get: ['get', 'clear',],
        });


        app.get('/api/sse/Terminal.exec', SSEExpress(), function (req, res, next) {
            Terminal.exec(req, res);
        });

        

        

    },
};
