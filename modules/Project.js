
const File = require('@definejs/file');

//检查指定 pid 的进程是否正在运行中。
//该方法来源于 https://www.it1352.com/1995930.html
function checkRunning(pid) {
    try {
        return process.kill(pid, 0);
    }
    catch (error) {
        return error.code === 'EPERM';
    }
}

module.exports = exports = {

    /**
    * 获取静态目录列表。
    */
    get: function (req, res, defaults) {
        let { watch, } = defaults;
        let { file, } = watch || {};
        let cwd = process.cwd();
        let pkg = File.readJSON(`${cwd}/package.json`);

        let processInfo = null;

        if (file && File.exists(file)) {
            let json = File.readJSON(file);
            processInfo = json.process;
        }

        //有 processInfo，也不一定说明正在运行。
        //可能是上次运行完后留下的信息，因此还需要检测一下。
        let isRunning = processInfo ? checkRunning(processInfo.pid) : false;

        return {
            'cwd': cwd,
            'process': isRunning ? processInfo : null,
            'package': pkg,
        };
    },


};

