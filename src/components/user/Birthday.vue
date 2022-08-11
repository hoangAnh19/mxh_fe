<template>
    <div class="list-birthday">
        <div class="top">
            <h2>Sinh nhật</h2>
        </div>

        <div class="form-month">
            <div v-if="months['tomorrow'].length" class="tomorrow form-month">
                <div class="h4 title">Sinh nhật trong tháng {{ month }}</div>
                <div
                    v-for="(user, index) in months['tomorrow']"
                    :key="index"
                    class="item"
                >
                    <div class="second-title fw-bold">
                        <a href=""></a>

                        {{ user.first_name + " " + user.last_name }}
                    </div>
                    <div class="avatar">
                        <router-link
                            :to="{
                                name: 'Profile',
                                params: { userId: user.id },
                            }"
                        >
                            <img
                                v-if="user.avatar"
                                :src="
                                    'http://127.0.0.1:8000/file_upload/' +
                                    user.avatar
                                "
                                :title="
                                    user.bird_day +
                                    ' là ngày sinh của ' +
                                    user.first_name +
                                    ' ' +
                                    user.last_name
                                "
                            />
                            <img
                                v-else
                                src="@/assets/image/default-user-avatar.png"
                                :title="
                                    user.bird_day +
                                    ' là ngày sinh của ' +
                                    user.first_name +
                                    ' ' +
                                    user.last_name
                                "
                            />
                        </router-link>
                    </div>
                </div>
            </div>
            <div
                class="month-next form-month"
                v-for="index in 12 - month - 1"
                :key="index"
            >
                <div v-if="months[index + month + 1].length">
                    <div class="h4 title">Tháng {{ index + month + 1 }}</div>
                    <div class="second-title">
                        <span class="fw-bold">{{
                            months[index + month + 1][0].first_name +
                            " " +
                            months[index + month + 1][0].last_name
                        }}</span>
                        <span v-if="months[index + month + 1].length - 1">
                            và {{ months[index + month + 1].length - 1 }} người
                            khác</span
                        >
                    </div>

                    <div class="list_avatar">
                        <div
                            v-for="(user, index) in months[index + month + 1]"
                            :key="index"
                            class="avatar_"
                        >
                            <router-link
                                :to="{
                                    name: 'Profile',
                                    params: { userId: user.id },
                                }"
                            >
                                <img
                                    v-if="user.avatar"
                                    :src="
                                        'http://127.0.0.1:8000/file_upload/' +
                                        user.avatar
                                    "
                                    :title="
                                        user.bird_day +
                                        ' là ngày sinh của ' +
                                        user.first_name +
                                        ' ' +
                                        user.last_name
                                    "
                                />
                                <img
                                    v-else
                                    src="@/assets/image/default-user-avatar.png"
                                    :title="
                                        user.bird_day +
                                        ' là ngày sinh của ' +
                                        user.first_name +
                                        ' ' +
                                        user.last_name
                                    "
                                />
                            </router-link>
                            <br v-if="index % 4 === 0" />
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="month-next form-month"
                v-for="index in month - 1"
                :key="index"
            >
                <div v-if="months[index].length">
                    <div class="title h4">Tháng {{ index }}</div>
                    <div class="second-title">
                        <span class="fw-bold">{{
                            months[index][0].first_name +
                            " " +
                            months[index][0].last_name
                        }}</span>
                        <span v-if="months[index].length - 1">
                            và {{ months[index].length - 1 }} người khác</span
                        >
                    </div>

                    <div class="list_avatar">
                        <div
                            v-for="(user, index) in months[index]"
                            :key="index"
                            class="avatar_"
                        >
                            <img
                                v-if="user.avatar && index < 7"
                                :src="
                                    'http://127.0.0.1:8000/file_upload/' +
                                    user.avatar
                                "
                                :title="
                                    user.bird_day +
                                    ' là ngày sinh của ' +
                                    user.first_name +
                                    ' ' +
                                    user.last_name
                                "
                            />
                            <img
                                v-if="!user.avatar && index < 7"
                                src="@/assets/image/default-user-avatar.png"
                                :title="
                                    user.bird_day +
                                    ' là ngày sinh của ' +
                                    user.first_name +
                                    ' ' +
                                    user.last_name
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";

export default {
    name: "Birthday",
    created() {
        (this.months[1] = []),
            (this.months[2] = []),
            (this.months[3] = []),
            (this.months[4] = []),
            (this.months[5] = []),
            (this.months[6] = []),
            (this.months[7] = []),
            (this.months[8] = []),
            (this.months[9] = []),
            (this.months[10] = []),
            (this.months[11] = []),
            (this.months[12] = []),
            (this.months["now"] = []),
            (this.months["tomorrow"] = []),
            (this.months["yesterday"] = []),
            Axios.get("user/list_user_birth_day").then((response) => {
                if (response.data.status == "success") {
                    this.users = response.data.data;
                    var date = new Date();
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    this.month = month;
                    var offset, date1;
                    this.users.forEach((user) => {
                        date1 = new Date(user.bird_day);
                        this.months[date1.getMonth() + 1].push(user);

                        if (month === date1.getMonth() + 1) {
                            offset = date1.getDate() - day;
                            if (offset == 0) {
                                this.months["now"].push(user);
                            } else if (offset == -1) {
                                this.months["yesterday"].push(user);
                            } else if (offset < 4) {
                                this.months["tomorrow"].push(user);
                            } else {
                                this.months[date1.getMonth() + 1].push(user);
                            }
                        }
                    });
                } else {
                    console.log(this.data.message);
                }
            });
    },
    props: {},
    data() {
        return {
            months: [],
            content: [],
            month: 0,
        };
    },
    watch: {},
    methods: {
        sendMessage(e, id) {
            var op = {
                type_post: 4,
                user_id_2: id,
                data: e.target.innerText,
            };
            e.target.innerText = "";
            if (op.data) {
                Axios.post("post/create", op)
                    .then((response) => {
                        if (response.data.status == "success") {
                            alert("Chúc mừng sinh nhật thành công");
                        } else {
                            alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                        }
                    })
                    .catch(() => {
                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    });
            }
        },
    },
};
</script>
<style scoped lang="scss">
.list-birthday {
    width: 40%;
    margin: 20px auto 0 auto;
}
.form-month {
    border-radius: 20px;
    background-color: white;
    margin: 20px 0;
}
.item {
    display: block;
    padding: 10px;
}
.item .right {
    flex: 1;
}
.avatar {
    display: flex;
    margin: 0 10px;
}
.avatar img,
.avatar_ img {
    width: 70px;
    height: 70px;
    border: 1px solid rgb(145, 94, 94);
    border-radius: 50%;
}
.right {
    // padding
    text-align: left;
}
.title {
    text-align: left;
    padding: 10px;
}
[contenteditable="true"]:empty:before {
    content: attr(placeholder);
    pointer-events: none;
    color: rgb(95, 84, 84);
    display: block; /* For Firefox */
}

.list_avatar {
    display: flex;
    padding: 10px;
}
.avatar_ {
    margin: 5px;
}
.second-title {
    text-align: left;
    padding-left: 15px;
}
.top {
    display: flex;
    margin-bottom: 20px;
}
.form-input {
    margin-left: auto;
    display: block;
    width: 30%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 20px;
}
</style>
