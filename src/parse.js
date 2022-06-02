var parse = {
    parseDate(date) {
        var dateParse = date.split("-");
        return dateParse[2] + "/" + dateParse[1] + "/" + dateParse[0];
    },
    parseEducation(education, short = false) {
        var status, level;
        if (education[5] || education[4]) status = "Đã học tại";
        else status = "Đang học tại";
        switch (education[0]) {
            case "1":
                level = "Tiểu học";
                break;
            case "2":
                level = "Trung học cơ sở";
                break;
            case "3":
                level = "Trung học phổ thông";
                break;
            case "4":
                level = "Đại hoc";
                break;
            default:
                level = "Cao hoc";
                break;
        }
        if (!short)
            return (
                status +
                    " " +
                    level +
                    " " +
                    " <span class='fw-bold'>" +
                    education[1] +
                    "</span> từ" +
                    (education[2] ? education[2] + "/" : "") +
                    education[3] +
                    " đến " +
                    (education[2] ? education[4] + "/" : "") +
                    education[5] ?? "nay"
            );
        else
            return (
                status +
                " " +
                level +
                " <span class='fw-bold'>" +
                education[1] +
                "</span>"
            );
    },
    parseWorkplace(education, short = false) {
        var time = education[2].split("-");
        var status;
        if (time.length == 1) status = "Đang làm ";
        else status = "Đã làm ";
        if (!short)
            return (
                status +
                " " +
                education[0] +
                " tại <span class='fw-bold'>" +
                education[1] +
                "</span> từ " +
                time[0] +
                " đến " +
                (time[1] ?? "nay")
            );
        else
            return (
                status +
                " " +
                education[0] +
                " tại <span class='fw-bold'>" +
                education[1] +
                "</span>"
            );
    },
};
export default parse;
