
const console = require('@webpart/console');
const List = require('./Sender/List');

let mapper = new Map();


class Sender {

    constructor(res) {
        let list = new List();

        let meta = {
            res,
            list,
        };

        mapper.set(this, meta);
        
    }

    send(event, data, isEnd) {
        let { res, list, } = mapper.get(this);
        let msg = list.push(data, isEnd);

        if (msg === false) {
            return;
        }

        // process.stdout.write(msg);

        //避免换行。 因为换行在 sse 的格式里有特殊含义。
        let time = Date.now();
        let json = JSON.stringify({ time, msg, });

        res.sse({
            'event': event,
            'data': json,
        });

        console.write(event, msg, time);
    }


}

module.exports = Sender;