

module.exports = {
    parse(list1, list2) {
        let len1 = list1.length;
        let len2 = list2.length;


        if (len2 < len1) {
            return true;
        }

        if (len2 == len1) {
            let json1 = JSON.stringify(list1);
            let json2 = JSON.stringify(list2);
            return json1 != json2;
        }

        //len2 > len1
        let list0 = list2.slice(0, len1);
        let json0 = JSON.stringify(list0);
        let json1 = JSON.stringify(list1);

        if (json0 == json1) {
            return list2.slice(len1);
        }

        return true;
    },
};