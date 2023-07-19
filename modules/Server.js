


module.exports = exports = {
    /**
    * 获取。
    */
    get(req, res, defaults) {

        let {
            host, port, statics, qrcode, session, allowHosts,
            allowCrossOrigin,
            info,
        } = defaults;

        return {
            host, port, statics, qrcode, session, allowHosts,

            api: {
                ...info,
                allowCrossOrigin,
            },

            //当前进程相关的信息，尽量提供。
            process: {
                'pid': process.pid,
                'cwd': process.cwd(),
                'env': process.env,
                'execArg': process.execArgv,
                'execPath': process.execPath,
                'argv': process.argv,
                'debugPort': process.debugPort,
                'platform': process.platform,
                'features': process.features,
            },
        };
    },


};

