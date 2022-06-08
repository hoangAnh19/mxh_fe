<template>
    <div class="d-flex">
        <div class="avatar">
            <img
                v-if="user.avatar"
                :src="'http://127.0.0.1:80/tmp_images/' + user.avatar"
            />
            <img v-else src="@/assets/image/default-user-avatar.png" />
        </div>
        <div class="content" style="flex: 1">
            <router-link
                :to="{ name: 'Profile', params: { userId: user.id } }"
                class="user-name fw-bold"
            >
                {{ user.first_name + " " + user.last_name }}
            </router-link>
            <div v-if="rol == 1">Quản trị viên</div>
            <div v-if="rol == 2">Kiểm duyệt viên</div>
            <div v-if="user.count_mutual_friends">
                {{ user.count_mutual_friends }} bạn chung
            </div>
        </div>
        <div class="control d-flex">
            <div v-if="friend_ !== -1" class="item friend">
                <div
                    class="btn btn-outline-primary"
                    v-on:click="addFriend"
                    v-if="friend_ == 0"
                >
                    Kết bạn
                </div>
                <div
                    class="btn btn-outline-success"
                    v-on:click="optionFriend = true"
                    v-if="friend_ == 1"
                    style="position: relative"
                >
                    Bạn bè
                    <div
                        v-if="optionFriend"
                        v-click-outside="closeOptionFriend"
                        class="options-friend"
                    >
                        <div v-on:click="unFriend">Hủy kết bạn</div>
                    </div>
                </div>
                <div
                    class="btn btn-outline-secondary"
                    v-on:click="unRequestFriend"
                    v-if="friend_ == 2"
                >
                    Hủy yêu cầu
                </div>
                <div
                    class="btn btn-outline-secondary"
                    v-if="friend_ == 3"
                    style="position: relative"
                    v-on:click="optionFeedback = true"
                >
                    Phản hồi
                    <div
                        v-if="optionFeedback"
                        v-click-outside="closeOptionFeedback"
                        class="options-friend"
                    >
                        <div
                            style="border-bottom: 2px solid #f2f2f2"
                            v-on:click="acceptFriend"
                        >
                            Chấp nhận
                        </div>
                        <div v-on:click="unRequestFriend">Từ chối</div>
                    </div>
                </div>
            </div>
            <div v-if="isManager && friend_ !== -1">
                <div
                    class="btn btn-outline-dark mx-2"
                    style="position: relative"
                    v-on:click="optionManager = true"
                >
                    <b-icon
                        class="control_manager"
                        icon="three-dots-vertical"
                    ></b-icon>
                    <div
                        v-if="optionManager"
                        v-click-outside="closeOptionManager"
                        class="options-friend"
                        style="width: 180px"
                    >
                        <div
                            style="border-bottom: 2px solid #f2f2f2"
                            v-on:click="assign(config.group.role.admin)"
                            v-if="
                                rol !== config.group.role.admin &&
                                sta == config.member.status.member
                            "
                        >
                            Gán quyền admin
                        </div>
                        <div
                            style="border-bottom: 2px solid #f2f2f2"
                            v-on:click="assign(config.group.role.censor)"
                            v-if="
                                rol !== config.group.role.censor &&
                                sta == config.member.status.member
                            "
                        >
                            Gán quyền kiểm duyệt viên
                        </div>
                        <div
                            style="border-bottom: 2px solid #f2f2f2"
                            v-on:click="assign(config.group.role.nomarl)"
                            v-if="
                                rol !== config.group.role.nomarl &&
                                sta == config.member.status.member
                            "
                        >
                            Gỡ quyền
                        </div>
                        <div
                            style="border-bottom: 2px solid #f2f2f2"
                            v-on:click="browserMember"
                            v-if="sta == config.member.status.pending"
                        >
                            Duyệt
                        </div>
                        <div
                            style="border-bottom: 2px solid #f2f2f2"
                            v-on:click="kickMember"
                            v-if="sta !== config.member.status.prevent"
                        >
                            Kick khỏi nhóm
                        </div>
                        <div
                            v-on:click="preventMember"
                            v-if="sta !== config.member.status.prevent"
                        >
                            Chặn
                        </div>
                        <div
                            v-on:click="cancelPreventMember"
                            v-if="sta == config.member.status.prevent"
                        >
                            Bỏ chặn
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import config from "@/config";
import Axios from "@/components/Axios.js";
import EventBus from "@/EventBus.js";
export default {
    name: "Member",
    props: {
        user: Object,
        role: null,
        status: null,
        isManager: Boolean,
    },
    created() {
        if ((this.user["relationship2"] ?? []).length) {
            this.friend_ = this.user["relationship2"][0]["type_friend"];
        } else if ((this.user["relationship1"] ?? []).length) {
            switch (this.user["relationship1"][0]["type_friend"]) {
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
                case 5:
                    this.friend_ = -1;
                    break;
            }
        } else {
            if (
                this.user.id === JSON.parse(localStorage.getItem("userInfo")).id
            ) {
                this.friend_ = -1;
            } else this.friend_ = 0;
        }
    },
    data() {
        return {
            config: config,
            friend_: -1,
            optionFriend: false,
            optionFeedback: false,
            optionManager: false,
            rol: this.role,
            sta: this.status,
        };
    },
    watch: {},
    computed: {},
    methods: {
        addFriend() {
            Axios.post("relationship/request_friend", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friend_ = 2;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        browserMember() {
            if (confirm("Bạn có muốn duyệt thành viên này")) {
                Axios.post("group/browser-member", {
                    member_id: this.user.id,
                    group_id: this.$route.params.groupId,
                })
                    .then((response) => {
                        if (response.data.status == "success") {
                            EventBus.$emit("deleteMember", this.user.id);
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch(() => {
                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    });
            }
        },
        kickMember() {
            if (confirm("Bạn có muốn kick thành viên này khỏi nhóm")) {
                Axios.post("group/kick-member", {
                    member_id: this.user.id,
                    group_id: this.$route.params.groupId,
                })
                    .then((response) => {
                        if (response.data.status == "success") {
                            EventBus.$emit("deleteMember", this.user.id);
                        } else {
                            alert(response.data.message);
                        }
                        this.optionManager = false;
                    })
                    .catch(() => {
                        this.optionManager = false;

                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    });
            }
        },
        cancelPreventMember() {
            if (confirm("Bạn có muốn bỏ chặn thành viên này")) {
                Axios.post("group/cancel-prevent-member", {
                    member_id: this.user.id,
                    group_id: this.$route.params.groupId,
                })
                    .then((response) => {
                        if (response.data.status == "success") {
                            EventBus.$emit("deleteMember", this.user.id);
                        } else {
                            alert(response.data.message);
                        }
                        this.optionManager = false;
                    })
                    .catch(() => {
                        this.optionManager = false;

                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    });
            }
        },
        preventMember() {
            if (confirm("Bạn có muốn chặn thành viên này")) {
                Axios.post("group/prevent-member", {
                    member_id: this.user.id,
                    group_id: this.$route.params.groupId,
                })
                    .then((response) => {
                        if (response.data.status == "success") {
                            EventBus.$emit("deleteMember", this.user.id);
                        } else {
                            alert(response.data.message);
                        }
                        this.optionManager = false;
                    })
                    .catch(() => {
                        this.optionManager = false;

                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    });
            }
        },
        closeOptionFriend() {
            this.optionFriend = false;
        },
        closeOptionFeedback() {
            this.optionFeedback = false;
        },
        closeOptionManager() {
            this.optionManager = false;
        },
        unFriend() {
            Axios.post("relationship/cancel_friend", {
                user_id: this.user.id,
            })
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friend_ = 0;
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
                        this.friend_ = 0;
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
                        this.friend_ = 1;
                    } else {
                        alert(response.data.message);
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        assign(role) {
            var confi;
            switch (role) {
                case this.config.group.role.admin:
                    confi = confirm(
                        "Bạn có muốn cho người này làm quản trị viên"
                    );
                    break;
                case this.config.group.role.censor:
                    confi = confirm(
                        "Bạn có muốn cho người này làm kiểm duyệt viên"
                    );
                    break;
                default:
                    confi = confirm(
                        "Bạn có muốn gỡ bỏ quyền hiện tại của người này"
                    );
                    break;
            }
            if (confi) {
                Axios.post("group/assign-permission", {
                    member_id: this.user.id,
                    group_id: this.$route.params.groupId,
                    role: role,
                })
                    .then((response) => {
                        if (response.data.status == "success") {
                            this.friend_ = 1;
                            this.rol = role;
                        } else {
                            alert(response.data.message);
                        }
                        this.optionManager = false;
                    })
                    .catch(() => {
                        this.optionManager = false;

                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    });
            }
        },
    },
};
</script>
<style scoped lang="scss">
.avatar {
    display: flex;
}
.avatar img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin: auto;
}
.content {
    padding: 10px 10px;
}
.user-name {
    color: black;
    text-decoration: none;
}
.options-friend {
    background: white;
    padding: 10px;
    border-radius: 5px;
    color: black;
    border: 1px solid #f2f2f2;
    position: absolute;
    top: 100%;
    width: 120px;
    z-index: 1;
}
</style>
