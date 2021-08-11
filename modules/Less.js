

const master = require('@webpart/master');
const Less = master.require('Less');



module.exports = exports = {
    data: null,

    /**
    *   body.data = {
    *       file: '',           //要编译的 less 文件。
    *       content: '',        //要编译的 less 内容。 当与 file 字段同时指定时，优先取本字段。 
    *       minify: false,      //是否压缩。
    *       dest: '',           //
    *   };
    */
    compile: function (req, res) {
        let data = req.body.data;
        let { file, content, minify, dest, } = data;
       
        try {
            Less.compile({
                'src': file,
                'content': content,
                'minify': minify,
                'dest': dest,
                'done': function (css, md5) {
                    res.success({
                        css,
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

