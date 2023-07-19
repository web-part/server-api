
const MD5 = require('@definejs/md5');
const master = require('@webpart/master');
const Js = master.require('Js');



module.exports = {

    /**
    *   body.data = {
    *       content: '',        //
    *   };
    */
    minify(req, res) {
        let { content, } = req.body.data;
       
        Js.minify({
            'content': content,

            'done': function (js) {
                let md5 = MD5.get(js);

                res.success({
                    js,
                    md5,
                });
            },
        });
    },


};

