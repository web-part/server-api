


module.exports = exports = {

    data: null,

    /**
    * 获取静态目录列表。
    */
    get: function (req, res) {
        try {

            let { opt, info, } = exports.data;
            

            res.success({
                'host': opt.host,
                'port': opt.port,
                'statics': opt.statics,
                'qrcode': opt.qrcode,
                'session': opt.session,
                'api': {
                    ...info,
                    'allowCrossOrigin': opt.allowCrossOrigin,
                },

                //当前进程相关的信息，尽量提供。
                'process': {
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
            });
        }
        catch (ex) {
            res.error(ex);
        }
    },


};

