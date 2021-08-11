
const jschardet = require('jschardet'); //检测文件编码的，https://www.npmjs.com/package/jschardet


module.exports = {

    isUTF8(content) { 
        let encoding = jschardet.detect(content);

        let isUTF8 =
            encoding.encoding == 'ascii' &&
            encoding.confidence == 1;

        return isUTF8;
    },
};