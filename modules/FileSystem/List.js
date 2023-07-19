

const fs = require('fs');
const MD5 = require('@definejs/md5');
const Directory = require('@definejs/directory');

const Path = require('../../lib/Path');


function getStat(path) { 
    let { atimeMs, birthtimeMs, ctimeMs, mtimeMs, size, } = fs.statSync(path);
    return { atimeMs, birthtimeMs, ctimeMs, mtimeMs, size, };
}


module.exports = {
    get(root) {
        let file$info = {};
        let dir$info = {};
       

        Directory.each(root, function (dir, myFiles, myDirs) { 
            let stat = getStat(dir);

            dir = Path.relative(root, dir);

            // if (dir) {
                dir = `${dir}/`;
                dir$info[dir] = { stat, };
            // }
       


            myFiles.forEach((file) => {
                let md5 = MD5.read(file);
                let stat = getStat(file);


                file = Path.relative(root, file);

                file$info[file] = {
                    md5, 
                    stat,
                };
            });

       
        });


        return { dir$info, file$info, };
    },

    
};


