﻿

const master = require('@webpart/master');


function parse(config, usePack) {
    let defaults = config.master[''];

    //命令中指定了使用独立打包的方式，合并相应的配置。
    if (usePack) {
        let defaultsPack = config.master['.pack'];

        Object.assign(defaults.packages, defaultsPack.packages);
    }

    master.config(defaults);    //
  
    let website = master.init();

    website.parse();

    let json = website.toJSON();

    return json;

    
}

module.exports = {
    /**
    * 
    */
    parse(req, res, defaults) {
        let usePack = req.query.usePack == 'true';
        let json = parse(defaults, usePack);

        return json;
    },


};

