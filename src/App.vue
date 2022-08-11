<template>
    <router-view></router-view>
    <ListUserHome v-bind:class="{ activeList: !isActiveList }" />
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import socket from "@/plugins/socket";
import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";
import ListUserHome from "@/components/home/ListUserHome.vue";

export default {
    components: {
        ListUserHome,
    },

    methods: {
        connected() {
            var app = this;
            socket.auth = { jwt: localStorage.getItem("token") };
            socket.connect();
            socket.on("connect", () => {
                Axios.get("online?client_id=" + socket.id)
                    .then()
                    .catch();
            });
            socket.on("laravel_database_chat:messageEvent", function (data) {
                console.log("data socket ", [data]);
                if (app.list_message[data.sender_id] ?? null) {
                    app.list_message[data.sender_id].push(data);
                } else {
                    app.countMessage += 1;
                    app.list_message[data.sender_id] = [data];
                }
                EventBus.$emit("message", data, data.receiver_id);
            });

            socket.on(
                "laravel_database_post_channel:postEvent",
                function (data) {
                    console.log("data socket ", data.user_id);
                    EventBus.$emit("newPost", data.user_id);
                }
            );

            socket.on(
                "laravel_database_comment_channel:commentEvent",
                function (data) {
                    console.log("data socket ", data.user_id);
                    EventBus.$emit("newComment", data.user_id);
                }
            );

            socket.on(
                "laravel_database_online_channel:onlineEvent",
                function (user_id) {
                    if (!app.listUser[user_id]) {
                        Axios.get(`user?user_id=${user_id}`).then(
                            (response) => {
                                if (response.data.status == "success") {
                                    app.listUser[user_id] = {
                                        ...response.data.data,
                                    };
                                    /**
                                     *TODO app.listUser
                                     */
                                    console.log(app.listUser[user_id]);
                                    app.listUser[user_id].connect = true;
                                    app.listUser[user_id].time_of = null;
                                    EventBus.$emit("on-off", {
                                        id: user_id,
                                        user: app.listUser[user_id],
                                    });
                                    EventBus.$emit("listUser", {
                                        user: app.listUser,
                                    });
                                }
                            }
                        );
                    } else {
                        app.listUser[user_id].connect = true;
                        app.listUser[user_id].time_of = null;
                        EventBus.$emit("on-off", {
                            id: user_id,
                            user: app.listUser[user_id],
                        });
                    }
                }
            );
            socket.on("offline", function (user_id) {
                if (app.listUser[user_id]) {
                    app.listUser[user_id].connect = false;
                    app.listUser[user_id].time_of = 0;
                    setInterval(function () {
                        app.listUser[user_id].time_of++;
                        EventBus.$emit("on-off", {
                            id: user_id,
                            user: app.listUser[user_id],
                        });

                        if (
                            app.listUser[user_id].time_of >= 10 ||
                            !app.listUser[user_id].time_of
                        ) {
                            if (!app.listUser[user_id].connect) {
                                if (app.listUser[user_id].newMessage) {
                                    app.listUser[user_id].time_of = null;
                                } else app.listUser[user_id] = null;
                            }

                            EventBus.$emit("on-off", {
                                id: user_id,
                                user: app.listUser[user_id],
                            });
                            clearInterval();
                        }
                    }, 6000);
                }
            });
            EventBus.$on("get_list_on_off", () => {
                console.log("Evenbus_on_get_list_on_off");
                EventBus.$emit("list_on_off", app.listUser);
            });
            EventBus.$on("message", (data, id) => {
                console.log(
                    "Evenbus_On_Message bắt socket Chat in file App in method",
                    data,
                    id
                );
                this.listUser.forEach((user) => {
                    if (user.id === data.receiver_id) {
                        if (user.message ?? null) user.message.push(data);
                        return;
                    }
                });
            });
        },
    },
    data() {
        return {
            countMessage: 0,
            list_message: [],
            countUser: 0,
            listUser: [],
            isActiveList: true,
        };
    },
    watch: {
        "$route.name": function () {
            if (this.$route.name == "Home") {
                this.isActiveList = true;
            } else this.isActiveList = false;
        },
    },
    async created() {
        // alert(1) //thời điểm này sẽ không nhận được gì ở console.
        var app = this;
        this.countMessage = 0;
        this.list_message = [];

        EventBus.$on("message", (data, id) => {
            console.log(
                "Evenbus_On_Message bắt socket Chat in file App in created",
                data,
                id
            );
            this.listUser.forEach((user) => {
                if (user.id === data.receiver_id) {
                    if (user.message ?? null) user.message.push(data);
                    return;
                }
            });
        });

        EventBus.$on("sendMessageHome", (data, id) => {
            this.listUser[id].message.push({
                isOne: this.listUser[id].is_one,
                data: data.data,
            });
        });
        EventBus.$on("logoff", () => {
            this.countMessage = 0;
        });

        EventBus.$on("login", () => {
            console.log("Evenbus_on_login");
            app.connected();
        });
        const token = window.localStorage.getItem("token");
        await axios
            .get("http://127.0.0.1:8000/api/userInfo", {
                headers: { Authorization: "Bearer " + token },
            })
            .then((response) => {
                app.connected();
                localStorage.setItem("userInfo", JSON.stringify(response.data));
            })
            .catch(() => {
                localStorage.removeItem("token");
                socket.disconnect();
            });
    },
};
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #f0f2f5;
    min-height: 100vh;
    width: 99vw;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
<style scoped lang="scss">
#form-chat {
    position: fixed;
    right: 0;
    z-index: 100;
    bottom: 0px;
    display: flex;
    text-align: left;

    // display: none;
}
.create-new-message {
    cursor: pointer;
    bottom: 0;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-top: auto;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    display: flex;
}
.icon-create-new-message {
    font-size: 30px;
    margin: auto;
}
.form-create-new-message {
    padding: 20px;
    width: 350px;
    height: 450px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    background-color: white;
    border-radius: 10px 10px 0 0;
}
.content-modal-new-message {
    padding-top: 10px;
}
.form-input {
    display: block;
    width: 100%;
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
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
input:focus {
    outline: none;
}
.item-search {
    padding: 10px;
    border-bottom: 1px solid #f2f2f2;
}
.form-create-new-message-title {
    text-align: left;
}
.item-search {
    padding: 10px;
    border-bottom: 1px solid #f2f2f2;
}
.avatar {
    display: flex;
}
.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: auto;
}
.activeList {
    display: none;
}
</style>
