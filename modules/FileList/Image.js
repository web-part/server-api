
const path = require('path');


module.exports = {

    //检查指定的路径是否为图片。
    check(src) { 

        let ext = path.extname(src).toLocaleLowerCase();

        let list = [
            '.png',
            '.jpg',
            '.jpeg',
            '.gif',
            '.bmp',
        ];

        return list.includes(ext);
    },
};