

const console = require('@webpart/console');

/**
* 增强型的 response，提供一些命名的方法。
*/
class Response {
    constructor(res) {
        this.res = res;
    }

    /**
    * 
    */
    send(json) {
        this.res.send(json);
    }

    sse(json) {
        this.res.sse(json);
    }

    /**
    * 已重载 success(data);
    * 已重载 success(msg, data);
    */
    success(msg, data) {
        //重载 success(data);
        if (typeof msg != 'string') {
            data = msg;
            msg = 'ok';
        }

        this.res.send({
            'code': 200,
            'msg': msg,
            'data': data || {},
        });
    }

    /**
    * 
    */
    empty(key) {
        this.res.send({
            code: 201,
            msg: `字段 ${key} 不能为空。`,
        });
    }

    /**
    * 已重载 none(item);
    * 已重载 none(msg, item);
    */
    none(msg, item) {
        //重载 none(item);
        if (typeof msg != 'string') {
            item = msg;
            msg = '不存在该记录';
        }

        this.res.send({
            'code': 404,
            'msg': msg,
            'data': item,
        });

    }

    /**
    * 
    */
    error(ex) {
        if (typeof ex == 'string') {
            ex = new Error(ex);
        }
        
        this.res.send({
            'code': 500,
            'msg': ex.message,
            'data': ex,
        });

        console.log(ex);
    }

    


}


module.exports = Response;