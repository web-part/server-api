
const MD5 = require('@definejs/md5');

module.exports = exports = {

    /**
    * 获取。
    */
    md5: function (req, res) {
        try {

            let data = req.body.data;
            let { content, } = data;
            let md5 = MD5.get(content);


            res.success({
                'content': content,
                'md5': md5,
            });
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

