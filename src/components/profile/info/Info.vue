<template>
    <b-col cols="4" offset="2">
        <div class="personal-information bg-white">
            <p class="title">
                <b-icon icon="person-circle"></b-icon> Thông tin cá nhân
            </p>
            <div v-if="!change.username" class="item row">
                <b-col class="label" cols="4">Họ tên</b-col>
                <b-col cols="5">{{
                    user.first_name + " " + user.last_name
                }}</b-col>
                <b-col
                    v-if="isOwner"
                    v-on:click="update('username')"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                >
            </div>
            <div v-else class="item row">
                <b-col class="form-group" cols="5">
                    <label class="label">Họ</label>
                    <input class="form-control" v-model="userNew.first_name" />
                    <span class="text-danger">{{ errors.first_name }}</span>
                </b-col>
                <b-col class="form-group" cols="4">
                    <label class="label">Tên</label>
                    <input class="form-control" v-model="userNew.last_name" />
                    <span class="text-danger">{{ errors.last_name }}</span>
                </b-col>
                <b-col
                    v-if="isOwner"
                    v-on:click="cancel('username')"
                    cols="3"
                    class="delete text-success"
                    ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                >
            </div>
            <div v-if="!change.gender" class="item row">
                <b-col class="label" cols="4">Giới tính</b-col>
                <b-col cols="5">{{
                    user.gender ? (user.gender == 1 ? "Nam" : "Nữ") : "Khác"
                }}</b-col>
                <b-col
                    v-if="isOwner"
                    v-on:click="update('gender')"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                >
            </div>
            <div v-else class="item row">
                <b-col class="label" cols="4">Giới tính</b-col>
                <b-col cols="5">
                    <div class="form-check d-inline-block p-0">
                        <input
                            type="radio"
                            value="1"
                            id="two"
                            v-model="userNew.gender"
                        />
                        <label for="one">Nam</label>
                    </div>
                    <div class="form-check d-inline-block">
                        <input
                            type="radio"
                            value="2"
                            id="three"
                            v-model="userNew.gender"
                        />
                        <label for="two">Nữ</label>
                    </div>
                    <div class="form-check d-inline-block">
                        <input
                            type="radio"
                            value="0"
                            id="one"
                            v-model="userNew.gender"
                        />
                        <label for="one">Khác</label>
                    </div>
                </b-col>
                <b-col
                    v-if="isOwner"
                    v-on:click="cancel('gender')"
                    cols="3"
                    class="delete text-success"
                    ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                >
            </div>
            <div v-if="!change.bird_day" class="item row">
                <b-col class="label" cols="4">Ngày sinh</b-col>
                <b-col cols="5">{{ parseDate(user.bird_day) }}</b-col>
                <b-col
                    v-if="isOwner"
                    v-on:click="update('bird_day')"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                >
            </div>
            <div v-else class="item row">
                <b-col class="label" cols="4">Ngày sinh</b-col>
                <b-col cols="5">
                    <input
                        type="date"
                        class="form-control"
                        v-model="userNew.bird_day"
                    />
                    <span class="text-danger">{{ errors.bird_day }}</span>
                </b-col>
                <b-col
                    v-on:click="cancel('bird_day')"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                >
            </div>
            <div class="item row" v-if="isOwner">
                <UploadAvatar v-bind:typeImage="1"></UploadAvatar>
            </div>
            <div class="item row" v-if="isOwner">
                <UploadAvatar v-bind:typeImage="2"></UploadAvatar>
            </div>
        </div>
    </b-col>
    <b-col cols="4">
        <div class="contact bg-white">
            <span class="title">
                <b-icon icon="telephone-fill"></b-icon> Thông tin liên hệ</span
            >
            <div v-if="!change.email" class="item row">
                <b-col class="label" cols="4">Email</b-col>
                <b-col cols="5">{{ user.email ?? "Chưa cập nhập" }}</b-col>
                <b-col
                    v-on:click="update('email')"
                    v-if="isOwner"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                >
            </div>
            <div v-else class="item row">
                <b-col class="label" cols="4">Email</b-col>
                <b-col cols="5"
                    ><input class="form-control" v-model="userNew.email" />
                    <span class="text-danger">{{ errors.email }}</span>
                </b-col>
                <b-col
                    v-on:click="cancel('email')"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                >
            </div>
            <div v-if="!change.phone" class="item row">
                <b-col class="label" cols="4">Số điện thoại</b-col>
                <b-col cols="5">{{ user.phone ?? "Chưa cập nhập" }}</b-col>
                <b-col
                    v-on:click="update('phone')"
                    v-if="isOwner"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                >
            </div>
            <div v-else class="item row">
                <b-col class="label" cols="4">Số điện thoại</b-col>
                <b-col cols="5"
                    ><input class="form-control" v-model="userNew.phone" />
                    <span class="text-danger">{{ errors.phone }}</span>
                </b-col>
                <b-col
                    v-on:click="cancel('phone')"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                >
            </div>
            <div v-if="!change.address" class="item row">
                <b-col class="label" cols="4">Nơi ở hiện tại</b-col>
                <b-col cols="5">{{ user.address ?? "Chưa cập nhập" }}</b-col>
                <b-col
                    v-on:click="update('address')"
                    v-if="isOwner"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                >
            </div>
            <div v-else class="item row">
                <b-col class="label" cols="4">Nơi ở hiện tại</b-col>
                <b-col cols="5"
                    ><input class="form-control" v-model="userNew.address" />
                    <span class="text-danger">{{ errors.address }}</span>
                </b-col>
                <b-col
                    v-on:click="cancel('address')"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                >
            </div>
        </div>
    </b-col>

    <b-col class="mt-4" cols="8" offset="2">
        <div class="career bg-white">
            <span class="title">
                <b-icon icon="flag-fill"></b-icon> Sự nghiệp</span
            >

            <div class="story p-4 mt-4">
                <div v-if="!change.story" class="item row">
                    <b-col class="label fw-bold" cols="4">
                        <b-icon icon="card-text"></b-icon>
                        Tiểu sử</b-col
                    >
                    <b-col cols="5">{{ user.story ?? "Chưa cập nhập" }}</b-col>
                    <b-col
                        style="text-align: right"
                        v-on:click="update('story')"
                        v-if="isOwner"
                        cols="3"
                        class="change text-success"
                        ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                    >
                </div>
                <div v-else class="item row">
                    <b-col class="label fw-bold" cols="4">
                        <b-icon icon="card-text"></b-icon>
                        Tiểu sử</b-col
                    >
                    <b-col cols="5"
                        ><input class="form-control" v-model="userNew.story" />
                        <span class="text-danger">{{ errors.story }}</span>
                    </b-col>
                    <b-col
                        v-on:click="cancel('story')"
                        cols="3"
                        class="change text-success"
                        ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                    >
                </div>
            </div>

            <div class="education p-4 mt-4">
                <div v-if="!change.education" class="item row">
                    <b-col class="label fw-bold" cols="4">
                        <b-icon icon="house-door"></b-icon>
                        Trường học</b-col
                    >
                    <b-col cols="5">{{
                        user.education ?? "Chưa cập nhập"
                    }}</b-col>
                    <b-col
                        style="text-align: right"
                        v-on:click="update('education')"
                        v-if="isOwner"
                        cols="3"
                        class="change text-success"
                        ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                    >
                </div>
                <div v-else class="item row">
                    <b-col class="label fw-bold" cols="4">
                        <b-icon icon="house-door"></b-icon>
                        Trường học</b-col
                    >
                    <b-col cols="5"
                        ><input
                            class="form-control"
                            v-model="userNew.education"
                        />
                        <span class="text-danger">{{ errors.education }}</span>
                    </b-col>
                    <b-col
                        v-on:click="cancel('education')"
                        cols="3"
                        class="change text-success"
                        ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                    >
                </div>
            </div>
            <div class="workplace p-4 mt-4">
                <div v-if="!change.workplace" class="item row">
                    <b-col class="label fw-bold" cols="4">
                        <b-icon icon="briefcase"></b-icon>
                        Vị trí công việc</b-col
                    >
                    <b-col cols="5">{{
                        user.workplace ?? "Chưa cập nhập"
                    }}</b-col>
                    <b-col
                        style="text-align: right"
                        v-on:click="update('workplace')"
                        v-if="isOwner"
                        cols="3"
                        class="change text-success"
                        ><b-icon icon="pencil"></b-icon> Chỉnh sửa</b-col
                    >
                </div>
                <div v-else class="item row">
                    <b-col class="label fw-bold" cols="4">
                        <b-icon icon="briefcase"></b-icon>
                        Vị trí công việc</b-col
                    >
                    <b-col cols="5"
                        ><input
                            class="form-control"
                            v-model="userNew.workplace"
                        />
                        <span class="text-danger">{{ errors.workplace }}</span>
                    </b-col>
                    <b-col
                        v-on:click="cancel('workplace')"
                        cols="3"
                        class="change text-success"
                        ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                    >
                </div>
            </div>

            <div
                v-if="isOwner"
                v-on:click="saveUpdate"
                class="px-4"
                style="text-align: right"
            >
                <div class="btn btn-primary">Lưu</div>
            </div>
        </div>
    </b-col>
</template>
<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import validate from "@/validate";
import parse from "@/parse";
import EventBus from "@/EventBus.js";
import UploadAvatar from "./UploadAvatar.vue";

export default {
    name: "Info",
    components: { UploadAvatar },
    created() {
        var user = JSON.parse(localStorage.getItem("userInfo"));
        this.isOwner = user.id == this.user.id ? true : false;
        this.userNew.education = this.user.education;
        this.userNew.workplace = this.user.workplace;
        this.userNew.first_name = this.user.first_name;
        this.userNew.last_name = this.user.last_name;
        this.userNew.gender = this.user.gender;
        this.userNew.bird_day = this.user.bird_day;
        this.userNew.email = this.user.email;
        this.userNew.address = this.user.address;
        this.userNew.phone = this.user.phone;
        this.userNew.story = this.user.story;
    },
    mounted() {},
    data() {
        return {
            userNew: {},
            isOwner: false,
            errors: {
                email: "",
                phone: "",
                bird_day: "",
                story: "",
                education: "",
                workplace: "",
                address: "",
                first_name: "",
                last_name: "",
            },
            change: {
                username: false,
                gender: false,
                birthday: false,
                email: false,
                phone: false,
                address: false,
                story: false,
                education: false,
                workplace: false,
            },

            day: 31,
            isErrors: false,
        };
    },
    watch: {},
    methods: {
        update(type) {
            switch (type) {
                case "username":
                    this.change.username = true;
                    break;
                case "gender":
                    this.change.gender = true;
                    break;
                case "bird_day":
                    this.change.bird_day = true;
                    break;
                case "email":
                    this.change.email = true;
                    break;
                case "address":
                    this.change.address = true;
                    break;
                case "phone":
                    this.change.phone = true;
                    break;
                case "story":
                    this.change.story = true;
                    break;
                case "education":
                    this.change.education = true;
                    break;
                case "workplace":
                    this.change.workplace = true;
                    break;
            }
        },
        cancel(type) {
            switch (type) {
                case "username":
                    this.change.username = false;
                    this.userNew.first_name = this.user.first_name;
                    this.userNew.last_name = this.user.last_name;
                    break;
                case "gender":
                    this.change.gender = false;
                    this.userNew.gender = this.user.gender;
                    break;
                case "story":
                    this.change.story = false;
                    this.userNew.story = this.user.story;
                    break;
                case "education":
                    this.change.education = false;
                    this.userNew.education = this.user.education;
                    break;
                case "workplace":
                    this.change.workplace = false;
                    this.userNew.workplace = this.user.workplace;
                    break;
                case "bird_day":
                    this.change.bird_day = false;
                    this.userNew.bird_day = this.user.bird_day;
                    break;
                case "email":
                    this.change.email = false;
                    this.userNew.email = this.user.email;
                    break;
                case "address":
                    this.change.address = false;
                    this.userNew.address = this.user.address;
                    break;
                case "phone":
                    this.change.phone = false;
                    this.userNew.phone = this.user.phone;
                    break;
            }
        },
        parseDate(date) {
            return parse.parseDate(date);
        },
        saveUpdate() {
            (this.errors = {
                email: "",
                phone: "",
                bird_day: "",
                story: "",
                education: "",
                workplace: "",
                address: "",
                first_name: "",
                last_name: "",
            }),
                (this.isErrors = false);
            var object = {};
            if (this.userNew.email) object.email = this.userNew.email;
            if (this.userNew.bird_day) object.bird_day = this.userNew.bird_day;

            object.phone = this.userNew.phone;
            object.last_name = this.userNew.last_name;
            object.bird_day = this.userNew.bird_day;
            object.story = this.userNew.story;
            object.education = this.userNew.education;
            object.workplace = this.userNew.workplace;
            object.address = this.userNew.address;
            object.gender = this.userNew.gender;
            object.first_name = this.userNew.first_name;
            if (!validate.email(object.email)) {
                this.errors.email = "Vui lòng nhập email";
                this.isErrors = true;
            }
            if (!validate.maxLength(object.email, 50)) {
                this.errors.email = "Email không được dài quá 50 kí tự";
                this.isErrors = true;
            }
            if (!validate.phone(object.phone)) {
                this.errors.phone = "Vui lòng nhập số điện thoại";
                this.isErrors = true;
            }
            if (!validate.required(object.first_name)) {
                this.errors.first_name = "Không được để trống";
                this.isErrors = true;
            }
            if (!validate.required(object.last_name)) {
                this.errors.last_name = "Không được để trống";
                this.isErrors = true;
            }
            if (!validate.datePast(object.bird_day)) {
                this.errors.bird_day = "Vui lòng nhập ngày trong quá khứ";
                this.isErrors = true;
            }
            if (!validate.maxLength(object.first_name, 20)) {
                this.errors.first_name = "Họ không được quá 20 kí tự";
                this.isErrors = true;
            }
            if (!validate.maxLength(object.last_name, 20)) {
                this.errors.last_name = "Tên không được quá 20 kí tự";
                this.isErrors = true;
            }
            if (!validate.maxLength(object.last_name, 20)) {
                this.errors.last_name = "Tên không được quá 20 kí tự";
                this.isErrors = true;
            }
            if (this.isErrors) return;

            Axios.put("user", object).then((response) => {
                if (response.data.status == "success") {
                    this.change = {
                        username: false,
                        gender: false,
                        birthday: false,
                        email: false,
                        phone: false,
                        address: false,
                        story: false,
                        education: false,
                        workplace: false,
                    };
                    EventBus.$emit("user", response.data.data);
                } else {
                    if (response.data.errors.email)
                        this.errors.email = response.data.errors.email[0];
                    if (response.data.errors.phone)
                        this.errors.phone = response.data.errors.phone[0];
                }
                console.log("clickkk");
            });
        },
    },
    props: {
        user: Object,
    },
};
</script>
<style scoped lang="scss">
.personal-information,
.contact,
.career {
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.05) !important;
    text-align: left;
    padding: 20px;
}
.item {
    margin: 30px 0;
}
.title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
}
.change,
.add,
.delete {
    margin: auto;
    cursor: pointer;
}
</style>
