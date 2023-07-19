
const MD5 = require('@definejs/md5');

module.exports = {

    /**
    * 获取。
    */
    md5(req, res) {
        let { content, } = req.body.data;
        let md5 = MD5.get(content);

        return { md5, };

    },


};

