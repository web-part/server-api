
const MD5 = require('@definejs/md5');
const master = require('@webpart/master');
const Js = master.require('Js');



module.exports = exports = {
    data: null,

    /**
    *   body.data = {
    *       content: '',        //
    *   };
    */
    minify: function (req, res) {
        let data = req.body.data;
        let { content, } = data;
       
        try {
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
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

