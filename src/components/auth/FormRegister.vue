<template>
    <div class="register-form container">
        <b-row>
            <b-col cols="4" offset="2">
                <div class="form-group">
                    <label for="first_name">Họ:</label>
                    <input
                        v-model="first_name"
                        class="form-control"
                        id="first_name"
                        type="text"
                    />
                    <span class="text-danger">{{ errors.first_name }}</span>
                </div>
            </b-col>
            <b-col cols="4">
                <div class="form-group">
                    <label for="last_name">Tên:</label>
                    <input
                        v-model="last_name"
                        class="form-control"
                        id="last_name"
                        type="text"
                    />
                    <span class="text-danger">{{ errors.last_name }}</span>
                </div>
            </b-col>
        </b-row>
        <div class="row">
            <div class="col-8 offset-2">
                <div class="form-group">
                    <label for="email_or_phone">Email / Số điện thoại:</label>
                    <input
                        v-model="email_or_phone"
                        class="form-control"
                        id="email_or_phone"
                        type="text"
                    />
                    <span class="text-danger">{{ errors.email_or_phone }}</span>
                </div>
                <div class="form-group">
                    <label for="birth_day">Ngày sinh:</label>
                    <input
                        v-model="birth_day"
                        class="form-control"
                        id="birth_day"
                        type="date"
                    />
                    <span class="text-danger">{{ errors.birth_day }}</span>
                </div>
                <div class="form-group">
                    <label for="gender">Giới tính:</label>
                    <br />
                    <div class="d-inline-block">
                        <div class="d-flex" style="margin-right: 20px">
                            <input
                                class="form-check-input"
                                style="margin-right: 10px"
                                type="radio"
                                value="1"
                                id="nam"
                                v-model="gender"
                            />
                            <label class="form-check-label" for="nam"
                                >Nam</label
                            >
                        </div>
                    </div>
                    <div class="d-inline-block">
                        <div class="d-flex" style="margin-right: 20px">
                            <input
                                class="form-check-input"
                                style="margin-right: 10px"
                                type="radio"
                                value="2"
                                id="nu"
                                v-model="gender"
                            />
                            <label class="form-check-label" for="nu">Nữ</label>
                        </div>
                    </div>
                    <div class="d-inline-block">
                        <div class="d-flex" style="margin-right: 20px">
                            <input
                                class="form-check-input"
                                style="margin-right: 10px"
                                type="radio"
                                value="3"
                                id="khac"
                                v-model="gender"
                            />
                            <label class="form-check-label" for="khac"
                                >Khác</label
                            >
                        </div>
                    </div>
                    <span class="text-danger">{{ errors.gender }}</span>
                </div>
                <div class="form-group">
                    <label for="password">Mật khẩu:</label>
                    <input
                        class="form-control"
                        v-model="password"
                        id="password"
                        type="password"
                    />
                    <span class="text-danger">{{ errors.password }}</span>
                </div>
                <div class="form-group">
                    <label for="confirm_password">Xác nhận mật khẩu:</label>
                    <input
                        class="form-control"
                        v-model="confirm_password"
                        id="confirm_password"
                        type="password"
                    />
                    <span class="text-danger">{{
                        errors.confirm_password
                    }}</span>
                </div>
                <div
                    class="btn btn-success form-control mt-4"
                    v-on:click="register"
                >
                    Tạo tài khoản mới
                </div>
                <div style="height: 30px"></div>

                <div class="d-flex">
                    <router-link
                        :to="{ name: 'Login' }"
                        class="btn btn-outline-danger"
                        style="margin: auto"
                        >Đăng nhập
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import validate from "@/validate.js";
import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";
export default {
    name: "FromRegister",
    data() {
        return {
            email_or_phone: "",
            password: "",
            confirm_password: "",
            first_name: "",
            last_name: "",
            birth_day: "",
            gender: 0,
            ajaxLock: false,
            errors: {
                email_or_phone: "",
                password: "",
                confirm_password: "",
                first_name: "",
                birth_day: "",
                last_name: "",
                gender: "",
            },
            isErrors: false,
        };
    },
    methods: {
        register() {
            if (this.ajaxLock) return;
            this.isErrors = false;
            if (!validate.required(this.email_or_phone)) {
                this.errors.email_or_phone = "Không được để trống";
                this.isErrors = true;
            } else if (
                !(
                    validate.email(this.email_or_phone) ||
                    validate.phone(this.email_or_phone)
                )
            ) {
                this.errors.email_or_phone =
                    "Vui lòng nhập email hoặc số điện thoại";
                this.isErrors = true;
            }

            if (!validate.required(this.password)) {
                this.errors.password = "Không được để trống";
                this.isErrors = true;
            } else if (
                !validate.minLength(this.password, 6) ||
                !validate.maxLength(this.password, 30)
            ) {
                this.errors.password =
                    "Mật khẩu phải nằm trong khoảng 6-30 kí tự";
                this.isErrors = true;
            }
            if (this.isErrors) return;
            Axios.post("register", {
                password: this.password,
                email_or_phone: this.email_or_phone,
                password_confirmation: this.confirm_password,
                first_name: this.first_name,
                last_name: this.last_name,
                gender: this.gender,
                bird_day: this.birth_day,
            })
                .then((response) => {
                    if (response.data.status === "success") {
                        localStorage.setItem(
                            "token",
                            response.data.access_token
                        );
                        EventBus.$emit("login");

                        this.$router.push({ name: "Login" });
                    } else {
                        if (response.data.errors.email_or_phone)
                            this.errors.email_or_phone =
                                response.data.errors.email_or_phone[0];
                        if (response.data.errors.password)
                            this.errors.password =
                                response.data.errors.password[0];
                        if (response.data.errors.loser)
                            this.errors.password =
                                response.data.errors.loser[0];
                    }
                    this.ajaxLock = false;
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    this.ajaxLock = false;
                });
        },
    },
};
</script>
<style scoped lang="scss">
.register-form {
    text-align: left;
}
label {
    float: left;
    padding: 10px 0;
    font-size: 20px;
}
.login-form {
    flex: 1;
}
.text-danger {
    float: left;
}
.form-group input {
    margin: auto;
}
img {
    width: 200px;
    object-fit: contain;
}
</style>
