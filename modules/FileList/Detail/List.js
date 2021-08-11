

const fs = require('fs');
const Directory = require('@definejs/directory');
const File = require('@definejs/file');
const MD5 = require('@definejs/md5');
const Path = require('../../../lib/Path');
const Encoding = require('../../../lib/Encoding');


// function check_node_modules(root, dir) {
//     const path = require('path');
//     let node_modules = path.join(root, 'node_modules/');

//     return dir.startsWith(node_modules);

// }


module.exports = {
    
    /**
    * 
    */
    stat: function (src, root) {
        let list = [];

        Directory.each(src, function (dir, files, dirs) {

            files = files.map(function (file) {
                let name = Path.relative(root, file);
                let ext = Path.ext(file);
                let content = File.read(file);
                let isUTF8 = Encoding.isUTF8(content);
                let md5 = MD5.get(content);

                return {
                    'type': 'file',
                    'name': '/' + name,
                    'ext': ext,
                    'md5': md5,
                    'isUTF8': isUTF8,
                    'stat': fs.statSync(file),
                };
            });


            dirs = dirs.map(function (sdir) {
                let name = Path.relative(root, sdir);

                return {
                    'type': 'dir',
                    'name': '/' + name,
                    'stat': fs.statSync(sdir),
                };
            });

            list.push(...dirs, ...files);
        });


        return list;
    },
};


