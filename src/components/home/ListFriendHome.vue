<template>
    <div class="list-friend-home">
        <div class="header d-flex justify-content-between">
            <div class="title">Danh bạ</div>
            <div class="d-flex">
                <b-icon class="search" icon="search"></b-icon>
                <b-icon
                    icon="three-dots"
                    class="setting"
                    style="margin-left: 20px"
                ></b-icon>
            </div>
        </div>
        <div class="body">
            <div v-if="!listUser.length" class="no-message">
                <button class="btn btn-create">
                    <b-icon icon="plus-circle-fill"></b-icon> Tạo cuộc trò
                    chuyện mới
                </button>
            </div>
            <div v-else>
                <div
                    v-for="user in listUser"
                    :key="user"
                    v-on:click="selectNewMessage(user)"
                >
                    <div v-if="user" class="d-flex user-online">
                        <div class="avatar">
                            <img
                                v-if="user.avatar"
                                :src="
                                    'http://127.0.0.1:8000/tmp_images/' +
                                    user.avatar
                                "
                            />

                            <img
                                v-else
                                src="@/assets/image/default-user-avatar.png"
                            />
                            <div class="online" v-if="user.connect"></div>
                            <div
                                class="offline"
                                v-if="!user.connect && user.time_of"
                            >
                                {{ user.time_of + " phút" }}
                            </div>
                        </div>
                        <span class="m-2">{{
                            `${user.first_name} ${user.last_name}`
                        }}</span>
                    </div>
                </div>
            </div>
            <div v-for="userMessage in listUserClick" :key="userMessage">
                <!-- <FormChat
                    v-if="userMessage && userMessage.select && modalDialog"
                    :user="userMessage"
                /> -->
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import Axios from "@/components/Axios.js";
import EventBus from "@/EventBus.js";
import FormChat from "@/components/chat/FormChat.vue";
import Axios from "@/components/Axios.js";

export default {
    name: "ListFriendHome",
    FormChat,
    components: {},
    props: {
        user: Object,
    },

    mounted() {
        EventBus.$on("closeUserDialog", () => {
            this.modalDialog = false;
        });
    },
    async created() {
        var app = this;
        EventBus.$emit("get_list_on_off");
        EventBus.$on("on-off", (data) => {
            app.listUser[data.id] = data.user;
        });
        EventBus.$on("list_on_off", (data) => {
            this.listUser = data;
        });
        EventBus.$on("listUser", (data) => {
            this.listUserClick = data;
        });
    },
    data() {
        return {
            countUser: 0,
            listUser: [],
            openChat: false,
            listUserClick: [],
            modalDialog: false,
        };
    },
    methods: {
        async getMessage(id, page) {
            await Axios.get("chat/getMessage?id=" + id + "&page=" + page)
                .then((res) => {
                    if (res.data.status == "success") {
                        if (!this.listUser[id].message) {
                            this.listUser[id].message = res.data.data;
                        } else {
                            this.listUser[id].message = this.listUser[
                                id
                            ].message.concat(res.data.data);
                        }
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        async selectNewMessage(user) {
            var user_id = user.id;
            var app = this;
            if (!app.listUser[user_id]) {
                await Axios.get(`user?user_id=${user_id}`).then((response) => {
                    if (response.data.status == "success") {
                        app.listUser[user_id] = { ...response.data.data };
                        console.log(app.listUser[user_id]);
                        app.listUser[user_id].connect = false;
                        app.listUser[user_id].time_of = null;
                        EventBus.$emit("on-off", {
                            id: user_id,
                            user: app.listUser[user_id],
                        });
                    }
                });
            }
            app.modalDialog = true;
            app.listUser[user_id].select = true;
            if (!app.listUser[user_id].message) {
                Axios.get("chat/getByIdUser?user_id=" + user_id)
                    .then((res) => {
                        var item = res.data;
                        if (item.user_1) {
                            app.listUser[user_id].is_one = false;
                        } else {
                            app.listUser[user_id].is_one = true;
                        }
                    })
                    .catch(() => {
                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                        this.ajaxLock = false;
                    });
                this.getMessage(user_id, 1);
                console.log("app", app.listUser[user_id].message);
            }
            this.createNewMessage = false;
        },
    },
    computed: {},
};
</script>
<style scoped lang="scss">
.title {
    text-align: left;
    font-weight: 600;
}
.list-friend-home {
    position: fixed;
    right: 0;
    top: 70px;
    padding: 30px 10px;
    margin-top: 10px;
    overflow: auto;
    width: 16.67%;
    height: calc(100vh - 80px);
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
.list-friend-home:hover::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.list-friend-home::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.list-friend-home:hover::-webkit-scrollbar-thumb {
    background: #646668;
    height: 100px;
    border-radius: 5px;
}
.body {
    padding: 30px 0;
}
.user-online {
    padding: 10px 0;
}
.no-message {
    top: 50%;
}
.btn-create {
    margin-top: 10px;
    width: 90%;
    border: 2px solid rgb(111, 190, 73);
    color: rgb(88, 170, 44);
}
.avatar {
    display: flex;
    position: relative;
}
.online {
    position: absolute;
    background-color: green;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    bottom: 0;
    right: 0;
}
.offline {
    position: absolute;
    background-color: green;
    font-size: 10px;
    height: 12px;
    bottom: 0;
    right: 0;
    color: white;
    border-radius: 4px;
    padding: 0 5px;
}
.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: auto;
}
</style>
