


function format(path) {
    //确保以 `/` 开头。
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    //确保不以 `/` 结尾。
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    return path;
}

module.exports = {

    parse({ api, sse, host, port, }) {
        host = host || 'localhost';

        api = format(api);
        sse = format(sse);


        let url = `http://${host}:${port}`;

        return { url, api, sse, };

    },
};