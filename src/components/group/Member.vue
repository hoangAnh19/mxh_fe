<template>
    <div class="d-flex">
        <div class="avatar">
            <img
                v-if="user.avatar"
                :src="'http://127.0.0.1:8000/file_upload/' + user.avatar"
            />
            <img v-else src="@/assets/image/default-user-avatar.png" />
        </div>
        <div class="content" style="flex: 1">
            <router-link
                :to="{ name: 'Profile', params: { userId: user.id } }"
                class="user-name fw-bold"
            >
                {{ user.first_name + " " + user.last_name }} - Đơn vị :
                {{ user.workplace }}
            </router-link>
            <div v-if="rol == 1">Quản trị viên</div>
            <div v-if="rol == 2">Kiểm duyệt viên</div>
        </div>
        <div class="control d-flex">
            <div v-if="isManager">
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
                        class="options-user"
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
                            v-if="sta == config.member.status.member"
                        >
                            Kick khỏi phòng/ban
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        style="border-bottom: 2px solid #f2f2f2"
        v-if="sta == config.member.status.pending"
    ></div>
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
    created() {},
    data() {
        return {
            config: config,
            optionManager: false,
            rol: this.role,
            sta: this.status,
        };
    },
    watch: {},
    computed: {},
    methods: {
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
            if (confirm("Bạn có muốn kick thành viên này khỏi phòng/ban")) {
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

        closeOptionManager() {
            this.optionManager = false;
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
.options-user {
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
