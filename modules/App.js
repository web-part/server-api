

const Body = require('./App/Body');
const Router = require('./App/Router');



module.exports = {

    init(app, { allowCrossOrigin, allowHosts, }) { 
        //指定了允许跨域，针对后端接口访问的。
        if (allowCrossOrigin) {
            app.use(function (req, res, next) {
                res.set({ 'Access-Control-Allow-Origin': '*', });
                next();
            });
        }


        //允许打开页面的域名，即可以通过哪些域名打开页面。
        if (allowHosts.length > 0) {
            app.use(function (req, res, next) {
                let { host, } = req.headers;

                let found = allowHosts.some((item) => {
                    return `${item}:${port}` == host;
                });

                if (found) {
                    next();
                }
                else {
                    res.status(403).send('禁止访问');
                }
            });
        }

        Body.init(app);
    },


    bind(app, api, name$item) { 


        Object.entries(name$item).forEach(([name, item]) => {
            let { module, plugin, defaults,  get, post, } = item;
            let base = `${api}/${name}.`;

            defaults = defaults || {};

            Router.bind(app, {
                module,
                plugin,
                defaults,
                base,
                get,
                post,
            });

        });
    },
};