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
                    v-if="isOwner"
                    v-on:click="cancel('bird_day')"
                    cols="3"
                    class="change text-success"
                    ><b-icon icon="x-circle"></b-icon> Hủy</b-col
                >
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

            <div class="school p-4">
                <div class="fw-bold mb-4">
                    <b-icon icon="house-door"></b-icon> Trường học
                    <span
                        v-if="isOwner"
                        class="text-success add"
                        style="float: right"
                    >
                        <b-icon icon="plus-circle"></b-icon>Thêm
                    </span>
                </div>
                <div v-if="!educationOld">Không có trường học để hiển thị</div>
                <div
                    v-for="(education, index) in educationOld"
                    :key="index"
                    class="pl-2 py-2"
                >
                    <div v-if="!change.education[index]" class="pl-2 py-2">
                        <span v-html="parseEducation(education)"></span>

                        <div
                            v-if="isOwner"
                            class="text-success change"
                            style="float: right"
                            v-on:click="update('education', index)"
                        >
                            <b-icon icon="pencil"></b-icon> Chỉnh sửa
                        </div>
                    </div>
                    <div v-else class="pl-2 py-2">
                        <b-row>
                            <b-col cols="2" class="form-group">
                                <label class="label"> Tên trường</label>
                                <input
                                    class="form-control"
                                    v-model="userNew.education[index][1]"
                                />
                            </b-col>
                            <b-col cols="2" class="form-group">
                                <label class="label"> Cấp bậc</label>
                                <select
                                    class="form-control"
                                    v-model="userNew.education[index][0]"
                                >
                                    <option value="1">Tiểu học</option>
                                    <option value="2">Trung học cơ sở</option>
                                    <option value="3">
                                        Trung học phổ thông
                                    </option>
                                    <option value="4">Đại học</option>
                                    <option value="5">Cao học</option>
                                </select>
                            </b-col>
                            <b-col cols="3" class="form-group">
                                <b-row>
                                    <b-col>
                                        <label class="label"> Từ tháng</label>
                                        <select
                                            v-model="
                                                education[
                                                    'monthStartEducation'
                                                ][index]
                                            "
                                            class="form-control"
                                        >
                                            <option
                                                v-for="month in 12"
                                                :key="month"
                                                value="{{month}}"
                                            >
                                                {{ month }}
                                            </option>
                                        </select>
                                    </b-col>
                                    <b-col>
                                        <label class="label"> Năm</label>
                                        <select
                                            v-model="
                                                education['yearStartEducation'][
                                                    index
                                                ]
                                            "
                                            class="form-control"
                                        >
                                            <option
                                                v-for="year in 50"
                                                :key="year"
                                                value="{{2022 - year}}"
                                            >
                                                {{ 2022 - year }}
                                            </option>
                                        </select>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col cols="3" class="form-group">
                                <b-row>
                                    <b-col>
                                        <label class="label"> Đến tháng</label>
                                        <select
                                            v-model="
                                                education['monthEndEducation'][
                                                    index
                                                ]
                                            "
                                            class="form-control"
                                        >
                                            <option
                                                v-for="month in 12"
                                                :key="month"
                                                value="{{month}}"
                                            >
                                                {{ month }}
                                            </option>
                                        </select>
                                    </b-col>
                                    <b-col>
                                        <label class="label">
                                            Năm
                                            {{
                                                education["yearEndEducation"][
                                                    index
                                                ]
                                            }}</label
                                        >
                                        <select
                                            v-model="
                                                education['yearEndEducation'][
                                                    index
                                                ]
                                            "
                                            class="form-control"
                                        >
                                            <option
                                                v-for="year in 50"
                                                :key="year"
                                                :value="2022 - year"
                                            >
                                                {{ 2022 - year }}
                                            </option>
                                        </select>
                                    </b-col>
                                </b-row>
                            </b-col>
                            {{ userNew.education }}
                            <b-col>
                                <div
                                    v-on:click="cancel('education', index)"
                                    class="text-success change"
                                    style="float: right"
                                >
                                    <b-icon icon="x-circle"></b-icon> Hủy
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </div>

            <div class="job p-4">
                <div class="fw-bold mt-4 mb-4">
                    <b-icon icon="briefcase"></b-icon> Công việc
                    <span
                        v-if="isOwner"
                        class="text-success add"
                        style="float: right"
                    >
                        <b-icon icon="plus-circle"></b-icon>Thêm
                    </span>
                </div>
                <div v-if="!workplaceOld">
                    Không có nơi làm việc để hiển thị
                </div>
                <div
                    v-for="(workplace, index) in workplaceOld"
                    :key="index"
                    class="pl-2 py-2"
                >
                    <div class="pl-2 py-2">
                        <span v-html="parseWorkplace(workplace)"></span>
                        <div
                            v-if="isOwner"
                            class="text-success change"
                            style="float: right"
                        >
                            <b-icon icon="pencil"></b-icon> Chỉnh sửa
                        </div>
                    </div>
                </div>
            </div>
            <div v-on:click="saveUpdate" class="px-4" style="text-align: right">
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

export default {
    name: "Info",
    created() {
        var user = JSON.parse(localStorage.getItem("userInfo"));
        this.isOwner = user.id == this.user.id ? true : false;
        this.userNew.education = [];
        this.userNew.workplace = [];
        var edu, start;
        var educations = JSON.parse(this.user.education);
        educations.forEach((education) => {
            this.change.education.push(false);
            edu = Object.values(education);
            start = edu[2];

            edu[2] = start.split("-")[1].split("/")[0] ?? null;
            edu[3] = start.split("-")[1].split("/")[1] ?? null;
            edu[4] = start.split("-")[0].split("/")[0] ?? null;
            edu[5] = start.split("-")[0].split("/")[1] ?? null;
            this.userNew.education.push(edu);
            this.educationOld.push(edu);
        });
        var workplaces = JSON.parse(this.user.workplace);
        workplaces.forEach((workplace) => {
            this.change.workplace.push(false);
            this.userNew.workplace.push(Object.values(workplace));
            this.workplaceOld.push(Object.values(workplace));
        });
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
                education: [],
                workplace: [],
                story: false,
            },
            educationOld: [],
            workplaceOld: [],

            day: 31,
            isErrors: false,
            ajaxLock: false,
        };
    },
    watch: {},
    methods: {
        update(type, index = null) {
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
                case "workplace":
                    this.change.education[index] = true;

                    break;
                case "education":
                    this.change.education[index] = true;
                    break;
            }
        },
        cancel(type, index = null) {
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
                case "education":
                    this.change.education[index] = false;
                    this.userNew.education[index] = this.educationOld[index];
                    break;
                case "workplace":
                    this.change.workplace[index] = false;
                    this.userNew.workplace[index] = this.workplaceOld[index];
                    break;
            }
        },
        parseDate(date) {
            return parse.parseDate(date);
        },
        parseEducation(education) {
            return parse.parseEducation(education);
        },
        parseWorkplace(education) {
            return parse.parseWorkplace(education);
        },
        saveUpdate() {
            if (this.ajaxLock) return;
            (this.errors = {
                email: "",
                phone: "",
                bird_day: "",
                story: "",
                address: "",
                first_name: "",
                last_name: "",
            }),
                (this.isErrors = false);
            var object = {};
            if (this.userNew.email) object.email = this.userNew.email;
            if (this.userNew.phone) object.phone = this.userNew.phone;
            if (this.userNew.bird_day) object.bird_day = this.userNew.bird_day;

            object.last_name = this.userNew.last_name;
            object.bird_day = this.userNew.bird_day;
            object.story = this.userNew.story;
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

            Axios.put("user", object)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.change = {
                            username: false,
                            gender: false,
                            birthday: false,
                            email: false,
                            phone: false,
                            address: false,
                            education: [],
                            workplace: [],
                            story: false,
                        };
                        EventBus.$emit("user", response.data.data);
                    } else {
                        if (response.data.errors.email)
                            this.errors.email = response.data.errors.email[0];
                        if (response.data.errors.phone)
                            this.errors.phone = response.data.errors.phone[0];
                    }
                    this.ajaxLock = false;
                    console.log("clickkk");
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    this.ajaxLock = false;
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
