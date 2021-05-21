
const Response = require('./Router/Response');



module.exports = {

    /**
    * 把指定模块的方法列表映射到可以进行 http 请求的路由中。 
    *   options = {
    *       module: '',     //必选。 模块名称，须是公共模块。 如 `User`。
    *       base: '',       //可选。 路由的公共部分。 如 `/User.login`、`/User.add`、`/User.delete`，则可以提取公共部分为 `/User.`。
    *       get: [],        //可选。 使用 `get` 方式进行请求的方法列表。 如 `login`、`delete` 等。
    *       post: [],       //可选。 使用 `post` 方式进行请求的方法列表。 如 `add` 等。
    *   };
    */
    use: function (app, options) {
        let mod = options.module;
        let base = options.base || `/${mod}.`;  //如 `/User.`
        let M = require(`../modules/${mod}`);


        ['get', 'post',].forEach(function (type) {

            //方法列表。
            let methods = options[type] || [];

            methods.forEach(function (name) {

                let route = base + name;

                //如 app.get('/User.login', fn);
                //如 app.post('/User.add', fn);
                app[type](route, function (req, res) {

                    //预解析 data 字段。
                    let data = req.body.data;

                    if (data) {
                        data = decodeURIComponent(data);
                        data = JSON.parse(data);
                        req.body.data = data;
                    }

                    let fn = M[name];

                    if (typeof fn != 'function') {
                        res.send({
                            code: 500,
                            msg: `${mod} 模块中不存在 ${name} 方法。`,
                        });
                        return;
                    }

                    //增强型的 response，提供一些命名的方法。
                    res = new Response(res);

                    fn.call(M, req, res);

                });

            });

        });
    },


    
};






