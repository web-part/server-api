

class Request{

    constructor(req) {
        let { data, } = req.body;

        //预解析 data 字段。
        if (data) {
            data = decodeURIComponent(data);
            req.body.data = JSON.parse(data);
        }

        return req;
    }
}



module.exports = Request;