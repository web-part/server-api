
const MD5 = require('@definejs/md5');
const Directory = require('@definejs/directory');

module.exports = {

    get(dir) {

        let files = Directory.getFiles(dir);

        let list = files.map((file) => {
            let md5 = MD5.read(file);
           
            return { file, md5, };
            
        });

        return list;
    },
};