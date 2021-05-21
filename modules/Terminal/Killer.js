
const console = require('@webpart/console');
const kill = require('tree-kill');

module.exports = {
    
    kill(pid) {
        if (!pid) {
            return;
        }

        kill(pid, function (error) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(`Terminal.exec kill: pid=${pid}`);
            }
        });
    },
};