

const File = require('@definejs/file');
const Directory = require('@definejs/directory');
const Path = require('../lib/Path');
const Detail = require('./FileList/Detail');
const List = require('./FileList/List');




module.exports = exports = {
    data: null,
    
    /**
    * 获取全部文件和目录列表。
    */
    get: function (req, res) {
        try {
            let { root, } = exports.data;
            let data = List.get(root);

            data.baseUrl = exports.data.url;

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
            let { root, } = exports.data;
            let data = Detail.read(root, id);

            let name = data.name;
            let baseUrl =  exports.data.url;
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


    /**
    * 删除一个文件或目录。
    *   body.data = {
    *       id: '',                 //要删除的文件或目录名称。
    *       type: 'file' | 'dir',   //类型，文件或目录。
    *   };
    */
    delete: function (req, res) {
        let data = req.body.data;
        let { id, type, } = data;

        if (!id) {
            res.empty('id');
            return;
        }

        try {
            let src = exports.data.root + id;

            if (!File.exists(src)) {
                res.send({
                    code: '404',
                    msg: '不存在: ' + id,
                });
                return;
            }

            if (type == 'file') {
                File.delete(src);
            }
            else {
                Directory.delete(src);
            }

            res.success({
                'id': id,
            });
        }
        catch (ex) {
            res.error(ex);
        }
    },

    /**
    * 写入。
    *   body.data = {
    *       id: '',                 //文件 id，即文件路径。
    *       mode: 'new' | 'edit',   //模式，是新增还是编辑。
    *       content: '',            //文件内容。
    *   };
    */
    write: function (req, res) {
        let item = req.body.data;
        let { id, mode, content, } = item;

        if (!id) {
            res.empty('id');
            return;
        }

        try {
            let { root, } = exports.data;
            let src = root + id;
            let existed = File.exists(src);

            if (mode == 'new' && existed) {
                res.send({
                    code: 301,
                    msg: '无法新增已存在的文件: ' + id,
                });
                return;
            }

            if (mode == 'edit' && !existed) {
                res.send({
                    code: 404,
                    msg: '无法编辑不存在的文件: ' + id,
                });
                return;
            }

            File.write(src, content);

            let data = Detail.read(root, id);
            res.success(data);

        }
        catch (ex) {
            res.error(ex);
        }
    },


};

