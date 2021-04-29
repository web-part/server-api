
//解决过长消息会给 stdout 截断的问题。
//观察发现，一条完整的消息是以 `\n` 结尾的，但不包括 `\r\n`。
//因此，可以判断，如果一条消息的结尾处不是 `\n`，说明它只是消息的一部分，
//因此可以先收集起来，等到结尾标志出现再串联起来成一条完整的消息。

class List {

    constructor() {
        this.list = [];
    }

    push(data) {
        let msg = data.toString();
        let list = this.list;
        let isEnd = msg.endsWith('\n') && !msg.endsWith('\r\n'); //消息结尾的判断。

        list.push(msg);

        //消息还没结束。
        if (!isEnd) {
            return false;
        }
        
        //消息已全部接收完成。
        msg = list.join('');
        list.length = 0; //清空。

        return msg;
    }


}

module.exports = List;