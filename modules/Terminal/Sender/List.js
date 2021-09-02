
//解决过长消息会给 stdout 截断的问题。
//观察发现，一条完整的消息是以 `\n` 结尾的，但不包括 `\r\n`。
//windows 平台的仅需要判断是以 `\n` 结尾即可。
//因此，可以判断，如果一条消息的结尾处不是 `\n`，说明它只是消息的一部分，
//因此可以先收集起来，等到结尾标志出现再串联起来成一条完整的消息。

const iconv = require('iconv-lite');




class List {

    constructor() {
        this.list = [];
    }

    push(data, isEnd) {
        let isWin32 = process.platform == 'win32';
        let msg = isWin32 ? iconv.decode(data, 'cp936') : data.toString();
    
        //未指定，则从内容中判断。
        if (isEnd === undefined) {
            isEnd = isWin32 ? msg.endsWith('\n') : msg.endsWith('\n') && !msg.endsWith('\r\n');
        }
        else if (isEnd) { //参数明确指定了要结束。
            msg += '\n';
        }


        let { list, } = this;


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