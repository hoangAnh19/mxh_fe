<template>
    <div class="profile-top">
        <img
            v-if="user.avatar"
            class="avatar"
            :src="config.url.image + user.avatar"
        />
        <img
            class="avatar"
            v-else
            src="@/assets/image/default-user-avatar.png"
        />

        <div class="row cover">
            <b-col class="p-0" cols="12">
                <img
                    v-if="user.cover"
                    class="cover"
                    :src="'http://127.0.0.1:80/tmp_images/' + user.cover"
                />
            </b-col>
        </div>

        <div class="row content mt-5 pt-4">
            <b-col cols="12">
                <div class="user-name h3 fw-bold">
                    {{ user.first_name + " " + user.last_name }}
                </div>
                <div class="story">{{ user.story }}</div>
            </b-col>
        </div>
        <div class="row navbars">
            <b-col cols="6">
                <b-row>
                    <b-col
                        cols="4"
                        class="cursor-pointer nav-bar-top time-line p-3 fw-bold"
                        v-on:click="changeComponent(1)"
                        >Dòng thời gian</b-col
                    >
                    <b-col
                        cols="4"
                        class="cursor-pointer nav-bar-top introduce p-3 fw-bold"
                        v-on:click="changeComponent(2)"
                        >Giới thiệu</b-col
                    >
                    <b-col
                        cols="2"
                        class="cursor-pointer nav-bar-top introduce p-3 fw-bold"
                        v-on:click="changeComponent(3)"
                        >Bạn bè</b-col
                    >
                    <b-col
                        cols="2"
                        class="cursor-pointer nav-bar-top introduce p-3 fw-bold"
                        v-on:click="changeComponent(4)"
                        >Ảnh</b-col
                    >
                </b-row>
            </b-col>
            <b-col cols="5" offset="1">
                <b-row>
                    <b-col
                        cols="3"
                        class="cursor-pointer nav-bar-top message py-3 fw-bold"
                    >
                        <div v-if="type_follow != null">
                            <b-icon
                                icon="chat-fill"
                                class="text-orange mx-1"
                            ></b-icon
                            >Nhắn tin
                        </div>
                    </b-col>
                    <b-col
                        cols="4"
                        class="cursor-pointer nav-bar-top follow py-3 fw-bold"
                    >
                        <div
                            v-if="type_follow == 1"
                            v-on:click="drop_follow = !drop_follow"
                            class="position-relative"
                        >
                            <b-icon
                                icon="check2"
                                class="text-orange mx-1"
                            ></b-icon
                            >Đang theo dõi
                            <div
                                v-if="drop_follow"
                                v-on:click="unFollow"
                                class="position-absolute drop_follow"
                            >
                                <span>Hủy theo dõi</span>
                            </div>
                        </div>

                        <div v-if="type_follow == 2" v-on:click="follow">
                            <img
                                src="@/assets/icon/follow-primary.svg"
                                class="text-orange mx-1"
                            />Theo dõi
                        </div>
                    </b-col>
                    <b-col
                        cols="4"
                        class="cursor-pointer nav-bar-top friend py-3 fw-bold"
                    >
                        <div v-if="type_friend == 4" v-on:click="addFriend">
                            <b-icon
                                icon="person-plus-fill"
                                class="text-orange mx-1"
                            ></b-icon
                            >Kết bạn
                        </div>
                        <div
                            v-if="type_friend == 1"
                            v-on:click="drop_friend = !drop_friend"
                            class="position-relative"
                        >
                            <b-icon
                                icon="check2"
                                class="text-orange mx-1"
                            ></b-icon
                            >Bạn bè
                            <div
                                v-if="drop_friend"
                                v-on:click="unFriend"
                                class="position-absolute drop_follow"
                            >
                                <span>Hủy kết bạn</span>
                            </div>
                        </div>
                        <div
                            v-if="type_friend == 2"
                            v-on:click="drop_friend = !drop_friend"
                            class="position-relative"
                        >
                            <b-icon
                                icon="check2"
                                class="text-orange mx-1"
                            ></b-icon
                            >Đã gửi lời mời
                            <div
                                v-if="drop_friend"
                                v-on:click="unRequestFriend"
                                class="position-absolute drop_follow"
                            >
                                <span>Hủy yêu cầu</span>
                            </div>
                        </div>

                        <div
                            v-if="type_friend == 3"
                            v-on:click="drop_friend = !drop_friend"
                            class="position-relative"
                        >
                            <b-icon
                                icon="check2"
                                class="text-orange mx-1"
                            ></b-icon
                            >Phản hồi
                            <div
                                v-if="drop_friend"
                                class="position-absolute drop_follow"
                            >
                                <div v-on:click="acceptFriend">Chấp nhận</div>
                                <br />
                                <div v-on:click="unRequestFriend">
                                    Xóa lời mời
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col
                        v-if="type_follow != null"
                        cols="1"
                        class="cursor-pointer nav-bar-top drop-down p-3 fw-bold"
                    >
                        <div
                            v-on:click="drop_setting = !drop_setting"
                            class="position-relative"
                        >
                            <b-icon icon="gear"> </b-icon>
                            <div
                                v-if="drop_setting"
                                class="position-absolute drop_setting"
                            >
                                <div v-on:click="prevent">Chặn</div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import config from "@/config";
import EventBus from "@/EventBus.js";
export default {
    name: "ProfileTop",

    props: {
        user: Object,
    },
    created() {
        this.getRelationship(this.$route.params.userId);
    },
    data() {
        return {
            config: config,
            type_follow: null,
            type_friend: null,
            is_prevent: false,
            drop_follow: false,
            drop_friend: false,
            drop_setting: false,
            component: 1,
            showModal: false,
        };
    },
    watch: {},
    mounted() {},
    methods: {
        getRelationship(id) {
            Axios.get("relationship/get_relationship?user_id=" + id)
                .then((response) => {
                    if (response.data.status == "success") {
                        var data = response.data.data;
                        this.type_follow = data.type_follow;
                        this.type_friend = data.type_friend;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        follow() {
            Axios.post("relationship/follow", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.type_follow = 1;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        addFriend() {
            Axios.post("relationship/request_friend", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.type_friend = 2;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        changeComponent(index) {
            if (this.component !== index) {
                this.component = index;
                EventBus.$emit("changeComponentProfile", index);
            }
        },
        unFollow() {
            Axios.post("relationship/cancel_follow", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.type_follow = 2;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        unFriend() {
            Axios.post("relationship/cancel_friend", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.type_friend = 4;
                        this.type_follow = 2;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        unRequestFriend() {
            Axios.post("relationship/cancel_request_friend", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.type_friend = 4;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        acceptFriend() {
            Axios.post("relationship/accept_friend", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.type_friend = 1;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        prevent() {
            Axios.post("relationship/prevent", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        alert("Chặn thành công");
                        this.$router.push({ name: "Home" });
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
    },
};
</script>
<style scoped lang="scss">
.text-orange {
    color: #ffa500;
}
.profile-top {
    background: white;
    padding: 0;
}
.avatar {
    width: 150px;
    height: 150px;
    font-size: 110px;
    margin: 0 auto;
}
a {
    text-decoration: none;
    color: black;
}
.item {
    text-align: left;
}
.cover {
    width: 100%;
    height: 300px;
    margin: 0;
}
.avatar {
    position: absolute;
    top: 150px;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: translateX(-50%);
    border: 5px white solid;
}
.content {
    text-align: center;
}
.drop_follow,
.drop_setting {
    transform: translate(25%, 0);
    background-color: white;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 10px 30px;
}
.drop_follow {
    left: 0;
    right: -20%;
}
.drop_setting {
    left: -30px;
    right: -50px;
}
</style>
