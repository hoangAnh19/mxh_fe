<template>
    <div class="login-form container">
        <div class="row">
            <div class="col-8 offset-2">
                <div class="form-group">
                    <label for="email_or_phone">Email:</label>
                    <input
                        v-model="email_or_phone"
                        class="form-control"
                        id="email_or_phone"
                        type="text"
                    />
                    <span class="text-danger">{{ errors.email_or_phone }}</span>
                    <br />
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
                <div
                    class="btn btn-primary form-control mt-4"
                    v-on:click="login"
                >
                    Đăng nhập
                </div>
                <div style="margin-top: 10px">
                    <router-link
                        :to="{ name: 'ResetPassword' }"
                        class="text-primary"
                        >Quên mật khẩu?
                    </router-link>
                </div>
                <div>
                    <router-link
                        :to="{ name: 'Register' }"
                        class="btn btn-outline-success mt-3"
                        >Tạo tài khoản mới
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import validate from "@/validate";
import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";
export default {
    name: "FromLogin",
    data() {
        return {
            email_or_phone: "",
            password: "",
            ajaxLock: false,
            errors: {
                email_or_phone: "",
                password: "",
            },
            isErrors: false,
        };
    },
    methods: {
        login() {
            if (this.ajaxLock) return;
            this.errors = {
                email_or_phone: "",
                password: "",
            };
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
                this.errors.email_or_phone = "Vui lòng nhập email ";
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
            Axios.post("login", {
                password: this.password,
                email_or_phone: this.email_or_phone,
            })
                .then((response) => {
                    if (response.data.status === "success") {
                        localStorage.setItem(
                            "token",
                            response.data.access_token
                        );
                        EventBus.$emit("login");

                        if (response.data.role === "admin")
                            this.$router.push({ name: "ManagerUser" });
                        else this.$router.push({ name: "Home" });
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
                .catch((e) => {
                    console.log(e);
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau1");
                    this.ajaxLock = false;
                });
        },
    },
};
</script>
<style scoped lang="scss">
label {
    float: left;
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;
}
.login-form {
    flex: 1;
}
.text-danger {
    float: left;
}
</style>
