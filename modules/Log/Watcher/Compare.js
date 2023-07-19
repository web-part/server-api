

module.exports = {
    parse(olds, news) {
        let len1 = olds.length;
        let len2 = news.length;

        //发生了变化。
        if (len2 < len1) {
            return true;
        }


        if (len2 == len1) {
            let json1 = JSON.stringify(olds);
            let json2 = JSON.stringify(news);
            return json1 != json2;
        }

        //len2 > len1
        let list0 = news.slice(0, len1);
        let json0 = JSON.stringify(list0);
        let json1 = JSON.stringify(olds);

        if (json0 == json1) {
            return news.slice(len1);
        }

        return true;
    },
};