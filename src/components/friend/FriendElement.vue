<template>
    <div class="elements">
        <img
            v-if="friend.avatar"
            class="avatar"
            :src="config.url.image + friend.avatar"
        />
        <img
            class="avatar"
            v-else
            src="@/assets/image/default-user-avatar.png"
        />
        <b-row>
            <b-col cols="10">
                <router-link
                    :to="{ name: 'Profile', params: { userId: friend.id } }"
                    class="fw-bold text-decoration-none link-user"
                >
                    {{ friend.first_name + " " + friend.last_name }}
                </router-link>
                <div v-if="friend.count_mutual_friends" class="pt-1">
                    {{ friend.count_mutual_friends + " bạn chung" }}
                </div>
                <div v-else style="height: 28px"></div>
            </b-col>
            <b-col
                cols="2"
                style="cursor: pointer"
                class="three-dots"
                v-on:click="showControl = 1"
                ><b-icon icon="three-dots-vertical"></b-icon>
                <div
                    class="form-control"
                    v-if="showControl == 1"
                    v-click-outside="hideControl"
                >
                    <div v-if="friend_ !== 4" class="item friend">
                        <div v-on:click="addFriend" v-if="friend_ == 0">
                            Kết bạn
                        </div>
                        <div v-on:click="unFriend" v-if="friend_ == 1">
                            Hủy kết bạn
                        </div>
                        <div v-on:click="unRequestFriend" v-if="friend_ == 2">
                            Hủy yêu cầu kết bạn
                        </div>
                        <div v-if="friend_ == 3" v-on:click="acceptFriend">
                            Chấp nhận lời mời
                        </div>
                    </div>
                    <div
                        v-if="friend_ !== 4"
                        v-on:click="unRequestFriend"
                        class="item friend"
                    >
                        <div v-if="friend_ == 3">Từ chối kết bạn</div>
                    </div>
                    <div class="item follow">
                        <div v-if="follow_ == 0" v-on:click="follow">
                            Theo dõi
                        </div>
                        <div v-if="follow_ == 1" v-on:click="unFollow">
                            Bỏ theo dõi
                        </div>
                    </div>
                    <div class="prevent">
                        <div v-on:click="prevent" v-if="friend_ !== 4">
                            Chặn
                        </div>
                        <div v-on:click="unPrevent" v-if="friend_ == 4">
                            Bỏ chặn
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
// import Axios from "@/components/Axios.js";
import config from "@/config";
import Axios from "@/components/Axios.js";

export default {
    name: "FriendElement",
    created() {
        if (this.friend["relationship2"].length) {
            if (
                this.friend["relationship2"][0]["type_follow"] == 1 ||
                this.friend["relationship2"][0]["type_follow"] == 2
            ) {
                this.follow_ = 1;
            } else this.follow_ = 0;
            this.friend_ = this.friend["relationship2"][0]["type_friend"];
        } else if (this.friend["relationship1"].length) {
            if (
                this.friend["relationship1"][0]["type_follow"] == 1 ||
                this.friend["relationship1"][0]["type_follow"] == 3
            ) {
                this.follow_ = 1;
            } else this.follow_ = 0;
            switch (this.friend["relationship1"][0]["type_friend"]) {
                case 0:
                    this.friend_ = 0;
                    break;
                case 1:
                    this.friend_ = 1;
                    break;
                case 2:
                    this.friend_ = 3;
                    break;
                case 3:
                    this.friend_ = 2;
                    break;
                // case 4:
                //   this.friend_ = 5;
                //   break;
                case 5:
                    this.friend_ = 4;
                    break;
            }
        } else {
            this.friend_ = 0;
            this.follow_ = 0;
        }
    },
    data() {
        return {
            config: config,
            showControl: 0,
            follow_: 0,
            friend_: 0,
            relationship: null,
        };
    },
    watch: {},
    methods: {
        hideControl() {
            this.showControl = 0;
        },
        addFriend() {
            Axios.post("relationship/request_friend", {
                user_id: this.friend.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friend_ = 2;
                        this.showControl = 0;
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
                user_id: this.friend.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.follow_ = 1;
                        this.showControl = 0;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        unFollow() {
            Axios.post("relationship/cancel_follow", {
                user_id: this.friend.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.follow_ = 0;
                        this.showControl = 0;
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
                user_id: this.friend.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friend_ = 0;
                        this.follow_ = 0;
                        this.showControl = 0;
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
                user_id: this.friend.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friend_ = 0;
                        this.showControl = 0;
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
                user_id: this.friend.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friend_ = 1;
                        this.showControl = 0;
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
                user_id: this.friend.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friend_ = 4;
                        this.showControl = 0;
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        unPrevent() {
            Axios.post("relationship/prevent", {
                user_id: this.friend.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friend_ = 0;
                        this.showControl = 0;
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
    },
    props: {
        friend: Object,
        component: Number,
    },
};
</script>
<style scoped lang="scss">
.elements {
    border-radius: 5px;
    border: 1px #b1a8a8 solid;
    background-color: #a2a3af;
    margin: 10px;
}
.link-user {
    color: rgb(29, 26, 26);
}
.avatar {
    width: 100%;
    height: 174px;
    margin-bottom: 5px;
}
.form-control {
    position: absolute;
    width: 150px;
    background: white;
    padding: 0;
    border-radius: 10px;
    border: 1px solid black;
}
.three-dots {
    position: relative;
}
.item {
    border-bottom: 1px solid black;
    padding: 5px;
}
.prevent {
    padding: 5px;
}
</style>
