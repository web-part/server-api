

const Directory = require('@definejs/directory');
const Path = require('../../lib/Path');


// function check_node_modules(root, dir) {
//     const path = require('path');
//     let node_modules = path.join(root, 'node_modules/');

//     return dir.startsWith(node_modules);

// }


module.exports = {
    get: function (root) {
        let dir$files = {}; //某个目录对应的文件列表（仅当前层级，不包括子目录的）。
        let dir$dirs = {};  //某个目录对应的子目录列表（仅当前层级，不包括子目录的）。


        Directory.each(root, function (dir, files, dirs) {
            // if (check_node_modules(root, dir)) {
            //     return;
            // }

            //文件列表，取成短名称。
            files = files.map(function (file) {
                file = Path.relative(dir, file);

                return file;
            });

            //子目录列表，取成短名称。
            dirs = dirs.map(function (sdir) {
                sdir = Path.relative(dir, sdir);

                return sdir;
            });

            //当前目录名，取成短名称。
            dir = Path.relative(root, dir);

            dir = '/' + dir;

            dir$files[dir] = files;
            dir$dirs[dir] = dirs;
        });

        let cwd = process.cwd();
        let $root = Path.relative(cwd, root);

        // dir$dirs['/'] = dir$dirs['/'].filter((dir) => {
        //     return dir != 'node_modules'; 
        // });

        return {
            'root': $root,
            'dir$files': dir$files,
            'dir$dirs': dir$dirs,
        };
    },

    
};


