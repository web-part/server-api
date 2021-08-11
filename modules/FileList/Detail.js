const fs = require('fs');
const File = require('@definejs/file');
const MD5 = require('@definejs/md5');
const Path = require('../../lib/Path');
const Encoding = require('../../lib/Encoding');
const Image = require('./Detail/Image');
const List = require('./Detail/List');



module.exports = {
    /**
    * 读取指定文件或目录的信息。
    */
    read(root, id) {
        let src = root + id;

        //不存在该文件或目录。
        if (!File.exists(src)) {
            return;
        }

        let stat = fs.statSync(src);
        let isFile = !stat.isDirectory();

        let data = {
            'name': id.startsWith('/') ? id : '/' + id, //确保以 `/` 开头。
            'stat': stat,
            'type': isFile ? 'file' : 'dir',
        };

        if (isFile) {
            let ext = Path.ext(src);
            let isImage = Image.check(src);
            let content = isImage ? '' : File.read(src);
            let md5 = MD5.get(content);
            let isUTF8 = Encoding.isUTF8(content);

            Object.assign(data, {
                'ext': ext,
                'md5': md5,
                'isUTF8': isUTF8,
                'content': content,
                'isImage': isImage,
            });
        }
        else {
            let list = List.stat(src, root);

            Object.assign(data, {
                'list': list,
            });
        }

        return data;
    },
};