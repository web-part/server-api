

const master = require('@webpart/master');
const Less = master.require('Less');



module.exports = {
    /**
    *   body.data = {
    *       file: '',           //要编译的 less 文件。
    *       content: '',        //要编译的 less 内容。 当与 file 字段同时指定时，优先取本字段。 
    *       minify: false,      //是否压缩。
    *       dest: '',           //
    *   };
    */
    compile(req, res, defaults) {
        let { dir, } = defaults;
        let { file, content, minify, dest, } = req.body.data;

       
        Less.compile({
            'src': `${dir}/${file}`,
            'content': content,
            'minify': minify,
            'dest': `${dir}/${dest}`,
            'done': function (css, md5) {
                res.success({
                    css,
                    md5,
                });
            },
        });


    },


};

