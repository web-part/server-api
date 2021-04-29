


const File = require('@definejs/file');
const Lines = require('@definejs/lines');

let file = './output/terminal.log';
// const path = require('path');
// file = path.resolve(file);
// console.log(file);


module.exports = {


    /**
    * 获取全部文件和目录列表。
    */
    get: function (req, res) {
        try {
            let content = File.read(file);
            let lines = Lines.split(content);

            let list = lines.map((line) => {
                if (!line) {
                    return null;
                }
                try {
                    return JSON.parse(line);
                }
                catch {
                    return null;
                }
            });

            res.success(list);
        }
        catch (ex) {
            res.error(ex);
        }
    },

    /**
    *
    */
    clear: function (req, res) {
        try {
            File.write(file, '');
            res.success([]);
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

