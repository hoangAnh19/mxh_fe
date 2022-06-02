var validate = {
    required(a) {
        if (!a.trim().length) {
            return false;
        }
        return true;
    },
    minLength(a, min) {
        if (a.trim().length < min) {
            return false;
        }
        return true;
    },
    maxLength(a, max) {
        if (a.trim().length > max) {
            return false;
        }
        return true;
    },
    email(a) {
        if (
            !/^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                a
            )
        ) {
            return false;
        }
        return true;
    },
    phone(a) {
        if (
            !/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
                a
            )
        ) {
            return false;
        }
        return true;
    },
    datePast(d) {
        let date = new Date();
        let date1 = new Date(d);
        if (date1 >= date) {
            return false;
        }
        return true;
    },
};
export default validate;
