var parse = {
    parseDate(date) {
        var dateParse = date.split("-");
        return dateParse[2] + "/" + dateParse[1] + "/" + dateParse[0];
    },
};
export default parse;
