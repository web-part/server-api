
const fs = require('fs');
const $File = require('@definejs/file');
const $Directory = require('@definejs/directory');

const File = require('./FileSystem/File');
const List = require('./FileSystem/List');




module.exports = {

    list(req, res, defaults) { 
        let { dir, } = defaults;
        let { dir$info, file$info, } = List.get(dir);

        return { dir, dir$info, file$info, };
    },

    /**
    * 读取指定的一个或多个文本文件。
    */
    read(req, res, defaults) {
        let { dir, } = defaults;
        let { files, content, info, } = req.body.data;
        let file$item = {};

        files.forEach((file) => {
            let item = File.read(`${dir}/${file}`);

            if (!info) {
                item = { 'content': item.content, };
            }

            if (!content) {
                item.content = undefined;
            }

            file$item[file] = item;

        });

        return file$item;
    },

    /**
   * 删除一个文件或目录。
   *   body.data = {
   *       id: '',                 //要删除的文件或目录名称。
   *   };
   */
    delete(req, res, defaults) {
        let { id, } = req.body.data;

        if (!id) {
            return 'id';
        }

        
        let src = `${defaults.dir}${id}`;

        if (!fs.existsSync(src)) {
            res.send({
                code: '404',
                msg: `不存在: ${id}`,
                data: { id, src, defaults, },
            });
            return;
        }


        if (id.endsWith('/')) {
            $Directory.delete(src);
        }
        else {
            $File.delete(src);
        }

        return { id, src, };

    },




};

