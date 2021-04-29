﻿

const { spawn, } = require('child_process');
const colors = require('colors/safe');
const Sender = require('./Terminal/Sender');
const Killer = require('./Terminal/Killer');



module.exports = {


    exec(req, res) {
        let cmd = req.query.cmd;
        let args = JSON.parse(req.query.args);
        let child = spawn(cmd, args);
        let pid = child.pid;
        let sender = new Sender(res);

        console.log(cmd, args);

        console.log(`Terminal.exec start: pid=${pid}; cmd=${cmd}; args=${req.query.args}`);

        req.on('close', function () {
            Killer.kill(pid);
        });
        
        
        child.on('close', function (code) {
            console.log(`Terminal.exec close: pid=${pid}; code=${code}`);
        });

        //执行了一个完全不存在的命令时会触发。
        child.on('error', function (error) {
            let msg = JSON.stringify(error) + '\n'; //这里要加个换行符以表示当前消息结束了，不用再等待了。
            sender.send('error', msg);
        });

        //执行一个存在的命令，但命令内部发生了错误时会触发。
        child.stderr.on('data', function (data) {
            sender.send('stderr', data);
        });

        //正常情况。
        child.stdout.on('data', function (data) {
            sender.send('stdout', data);
        });


    },


    


};

