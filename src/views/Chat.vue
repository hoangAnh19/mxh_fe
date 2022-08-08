<template>
    <div class="chat">
        <Header v-bind:user="user" />

        <div class="body">
            <b-row style="margin: 0">
                <b-col cols="3" style="padding: 0">
                    <LeftChat
                        :user="user"
                        v-bind:listChat="listChat"
                        v-bind:ajaxListMessage="ajaxListMessage"
                    />
                </b-col>
                <b-col cols="9" style="padding: 0">
                    <MainChat :user="user" :chat="selectMessage" />
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import LeftChat from "@/components/chat/LeftChat.vue";
import MainChat from "@/components/chat/MainChat.vue";
import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";

export default {
    name: "Chat",
    created() {
        this.getListChat();
        console.log("listchat", this.listChat);
        EventBus.$on("loadChat", () => {
            this.getListChat();
            this.ajaxListMessage = true;
        });

        EventBus.$on("message", (data) => {
            var x = true;
            this.listChat.forEach((user, index) => {
                if (
                    user.id === data.sender_id &&
                    user.last_message.mess_id != data.mess_id
                ) {
                    user.last_message = data;
                    if (user.isLoad) user.message.unshift(data);
                    this.listChat.splice(index, 1);
                    this.listChat.unshift(user);
                    x = false;
                    return;
                }
            });
            if (x) {
                Axios.get("chat/getById?id=" + data.id)
                    .then((res) => {
                        var item_ = {};
                        var item = res.data;
                        if (item.user_1) {
                            item_ = { ...item.user_1 };
                            item_.is_one = false;
                        } else {
                            item_ = { ...item.user_2 };

                            item_.is_one = true;
                        }
                        item_.last_time = item.last_time;
                        item_.message = [item.last_message];
                        item_.last_message = item.last_message;
                        item_.isLoad = true;
                        this.listChat.unshift(item_);
                    })
                    .catch(() => {
                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                        this.ajaxLock = false;
                    });
            }
            console.log(
                " Evenbus_On_Message bắt socket Chat in file Chat",
                data
            );
        });

        EventBus.$on("message_", (data) => {
            console.log(
                "Evenbus_on_Message1 in file chat",
                this.listChat,
                data
            );
            var x = data.sender_id;
            data.sender_id = data.receiver_id;
            data.receiver_id = x;
            this.listChat.forEach((user, index) => {
                if (user.id === data.sender_id) {
                    user.last_message = data;
                    if (user.isLoad) user.message.unshift(data);
                    this.listChat.splice(index, 1);
                    this.listChat.unshift(user);
                    return;
                }
            });
        });

        this.user = JSON.parse(localStorage.getItem("userInfo"));
        EventBus.$on("selectMessage", (item) => {
            var x = true;
            this.listChat.forEach((user) => {
                if (user.id === item.id) {
                    x = false;
                }
            });
            if (x) {
                item.message = [];
                this.listChat.unshift(item);
            }
            this.selectMessage = item;
            alert("Chọn người liên hệ thành công");
        });

        EventBus.$on("loadMessage", (data, id) => {
            this.listChat.forEach((item) => {
                if (item.id === id) {
                    item.isLoad = true;
                    item.message = item.message.concat(data);
                    this.selectMessage.message = item.message;
                    return;
                }
            });
        });
    },
    data() {
        return {
            user: {},
            listChat: [],
            selectMessage: {},
            ajaxListMessage: false,
        };
    },
    methods: {
        getListChat() {
            var offset = this.listChat.length;

            Axios.get("chat/getList?offset=" + offset)
                .then((res) => {
                    var item_ = {};
                    res.data.forEach((item) => {
                        if (item.user_1) {
                            item_ = { ...item.user_1 };
                            item_.is_one = false;
                        } else {
                            item_ = { ...item.user_2 };

                            item_.is_one = true;
                        }
                        item_.last_time = item.last_time;
                        item_.message = [];
                        item_.last_message = item.last_message;
                        item_.isLoad = false;
                        this.listChat.push(item_);
                    });
                    this.ajaxListMessage = false;
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    this.ajaxLock = false;
                });
        },
    },
    components: {
        Header,
        LeftChat,
        MainChat,
    },
};
</script>
<style scoped lang="scss">
.body {
    position: relative;
    top: 80px;
    border-top: 1px solid #f2f2f2;
}
</style>
