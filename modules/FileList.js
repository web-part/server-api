
const fs = require('fs');
const File = require('@definejs/file');
const MD5 = require('@definejs/md5');
const Path = require('../lib/Path');
const List = require('./FileList/List');
const Image = require('./FileList/Image');




const meta = {
    root: '',
    url: '',
};

/**
* 读取指定文件或目录的信息。
*/
function read(id) {
    let src = meta.root + id;

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


        Object.assign(data, {
            'ext': ext,
            'md5': md5,
            'content': content,
            'isImage': isImage,
        });
    }
    else {
        let list = List.stat(src, meta.root);

        Object.assign(data, {
            'list': list,
        });
    }

    return data;
}



module.exports = {

    config: function ({ root, url, }) {
        meta.root = root;
        meta.url = url;
    },


    /**
    * 获取全部文件和目录列表。
    */
    get: function (req, res) {
        try {
            let data = List.get(meta.root);

            data.baseUrl = meta.url;

            res.success(data);
        }
        catch (ex) {
            res.error(ex);
        }
    },

    /**
    * 读取指定的文件。
    *   query: {
    *       id: '', //文件路径。
    *   },
    */
    read: function (req, res) {
        let id = req.query.id || '';

        try {

            let data = read(id);

            let name = data.name;
            let root = meta.root;
            let baseUrl =  meta.url;


            let url = baseUrl + '/' + Path.join(root, name);

            Object.assign(data, {
                'root': root,
                'baseUrl': baseUrl,
                'url': url,
            });

            if (data) {
                res.success(data);
            }
            else {
                res.none({ 'id': id, });
            }
        }
        catch (ex) {
            res.error(ex);
        }
    },



};

