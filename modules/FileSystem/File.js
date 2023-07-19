const fs = require('fs');

const File = require('@definejs/file');
const MD5 = require('@definejs/md5');


module.exports = exports = {

   
    read(file) {
        let md5 = MD5.read(file);
        let content = File.read(file);
        let { atimeMs, birthtimeMs, ctimeMs, mtimeMs, size, } = fs.statSync(file);
        let stat = { atimeMs, birthtimeMs, ctimeMs, mtimeMs, size, };

        return {
            content,
            md5, 
            stat,
        };
    }
};