
const Request = require('./Router/Request');
const Response = require('./Router/Response');



module.exports = {

    bind(app, opt) { 
        let { module, plugin, defaults, base, get, post, } = opt;

        Object.entries({ get, post, }).forEach(([type, list]) => {
            if (!list) {
                return;
            }

            list.forEach((name) => {
                //如 app.get('/User.login', fn);
                //如 app.post('/User.add', fn);
                if (plugin) {
                    app[type](`${base}${name}`, plugin, process);
                }
                else {
                    app[type](`${base}${name}`, process);
                }


                function process(req, res) {
                    req = new Request(req);
                    res = new Response(res);

                    let fn = module[name];

                    if (typeof fn != 'function') {
                        res.error(`${module} 模块中不存在 ${name} 方法。`);
                        return;
                    }


                    try {
                        let data = fn.call(module, req, res, defaults);

                        if (typeof data == 'string') {
                            res.empty('id');
                            return;
                        }

                        if (typeof data == 'object') {
                            res.success(data);
                            return;
                        }

                    }
                    catch (ex) {
                        console.log(ex);
                        // res.error(ex);
                    }

                }

                
            });
        });





      


    },



    
};






