<template>
    <div class="list-birthday">
        <div v-if="months['yesterday'].length" class="yesterday form-month">
            <div class="h4 title">Sinh nhật gần đây</div>
            <div
                v-for="(friend, index) in months['yesterday']"
                :key="index"
                class="item"
            >
                <div class="avatar">
                    <img
                        v-if="friend.avatar"
                        :src="'http://127.0.0.1:80/tmp_images/' + friend.avatar"
                    />
                    <img v-else src="@/assets/image/default-user-avatar.png" />
                </div>
                <div class="right">
                    <div class="fw-bold">
                        {{ friend.first_name + " " + friend.last_name }}
                    </div>
                    <div>{{ friend.bird_day }}</div>
                    <div
                        contenteditable="true"
                        placeholder="Viết lên dòng thời gian của anh ấy"
                        class="form-control"
                        @keydown.enter.exact.prevent="
                            sendMessage($event, friend.id)
                        "
                        style="width: 100%"
                    ></div>
                </div>
            </div>
        </div>
        <div v-if="months['now'].length" class="now form-month">
            <div class="h4 title">Hôm nay</div>
            <div
                v-for="(friend, index) in months['now']"
                :key="index"
                class="item"
            >
                <div class="avatar">
                    <img
                        v-if="friend.avatar"
                        :src="'http://127.0.0.1:80/tmp_images/' + friend.avatar"
                    />
                    <img v-else src="@/assets/image/default-user-avatar.png" />
                </div>
                <div class="right">
                    <div class="fw-bold">
                        {{ friend.first_name + " " + friend.last_name }}
                    </div>
                    <div>{{ friend.bird_day }}</div>
                    <div
                        contenteditable="true"
                        placeholder="Viết lên dòng thời gian của anh ấy"
                        @keydown.enter.exact.prevent="
                            sendMessage($event, friend.id)
                        "
                        class="form-control"
                        style="width: 100%"
                    ></div>
                </div>
            </div>
        </div>
        <div v-if="months['tomorrow'].length" class="tomorrow form-month">
            <div class="h4 title">Sinh nhật sắp tới</div>
            <div
                v-for="(friend, index) in months['tomorrow']"
                :key="index"
                class="item"
            >
                <div class="avatar">
                    <img
                        v-if="friend.avatar"
                        :src="'http://127.0.0.1:80/tmp_images/' + friend.avatar"
                    />
                    <img v-else src="@/assets/image/default-user-avatar.png" />
                </div>
                <div class="right">
                    <div class="fw-bold">
                        {{ friend.first_name + " " + friend.last_name }}
                    </div>
                    <div>{{ friend.bird_day }}</div>
                </div>
            </div>
        </div>
        <div
            class="month-next form-month"
            v-for="index in 12 - month + 1"
            :key="index"
        >
            <div v-if="months[index + month - 1].length">
                <div class="h4 title">Tháng {{ index + 1 }}</div>
                <div class="second-title">
                    <span class="fw-bold">{{
                        months[index + month - 1][0].first_name +
                        " " +
                        months[index + month - 1][0].last_name
                    }}</span>
                    <span v-if="months[index + month - 1].length - 1">
                        và {{ months[index + month - 1].length - 1 }} người
                        khác</span
                    >
                </div>

                <div class="list_avatar">
                    <div
                        v-for="friend in months[index + month - 1]"
                        :key="friend"
                        class="avatar_"
                    >
                        <img
                            v-if="friend.avatar"
                            :src="
                                'http://127.0.0.1:80/tmp_images/' +
                                friend.avatar
                            "
                            :title="
                                friend.bird_day +
                                ' là ngày sinh của ' +
                                friend.first_name +
                                ' ' +
                                friend.last_name
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                            :title="
                                friend.bird_day +
                                ' là ngày sinh của ' +
                                friend.first_name +
                                ' ' +
                                friend.last_name
                            "
                        />
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
                        v-for="friend in months[index]"
                        :key="friend"
                        class="avatar_"
                    >
                        <img
                            v-if="friend.avatar"
                            :src="
                                'http://127.0.0.1:80/tmp_images/' +
                                friend.avatar
                            "
                            :title="
                                friend.bird_day +
                                ' là ngày sinh của ' +
                                friend.first_name +
                                ' ' +
                                friend.last_name
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                            :title="
                                friend.bird_day +
                                ' là ngày sinh của ' +
                                friend.first_name +
                                ' ' +
                                friend.last_name
                            "
                        />
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
            Axios.get("relationship/list_friend_birth_day").then((response) => {
                if (response.data.status == "success") {
                    this.friends = response.data.data;
                    var date = new Date();
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    this.month = month;
                    var offset, date1;
                    this.friends.forEach((friend) => {
                        date1 = new Date(friend.bird_day);
                        this.months[date1.getMonth() + 1].push(friend);

                        if (month === date1.getMonth() + 1) {
                            offset = date1.getDate() - day;
                            if (offset == 0) {
                                this.months["now"].push(friend);
                            } else if (offset == -1) {
                                this.months["yesterday"].push(friend);
                            } else if (offset < 4) {
                                this.months["tomorrow"].push(friend);
                            } else {
                                this.months[date1.getMonth() + 1].push(friend);
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
    display: flex;
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
</style>
