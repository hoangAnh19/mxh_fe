<template>
    <div
        v-click-outside="closeDialog"
        class="user-dialog bg-white border border-2 border-light d-flex flex-column"
    >
        <router-link
            :to="{ name: 'Profile', params: { userId: userId } }"
            class="avatar"
        >
            <img
                v-if="user.avatar"
                :src="'http://127.0.0.1:8000/tmp_images/' + user.avatar"
                class="rounded-circle bg-secondary"
                style="width: 110px; height: 110px"
            />
            <img
                class="rounded-circle bg-secondary"
                v-else
                src="@/assets/image/default-user-avatar.png"
            />
        </router-link>
        <router-link
            :to="{ name: 'Profile', params: { userId: userId } }"
            class="fw-bold"
            >{{ username }}
        </router-link>
        <div class="items px-4 pt-3">
            <div
                class="boder border-top border-1 border-dark d-flex flex-column"
            >
                <!-- <router-link :to="{ name: 'Setting' }" class="px-6 my-3 item">
                    <img src="@/assets/icon/icon-setting.svg" /> Cài đặt
                </router-link>
                <router-link
                    :to="{ name: 'UpdateProfile' }"
                    class="px-6 my-3 item"
                >
                    <img src="@/assets/icon/icon-edit-profile.svg" /> Chỉnh sửa
                    thông tin
                </router-link> -->
                <div v-on:click="logoff" class="px-6 my-3 logoff item">
                    <img src="@/assets/icon/icon-logout.svg" /> Đăng xuất
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import EventBus from "@/EventBus.js";
import socket from "@/plugins/socket";

export default {
    name: "UserDialog",
    props: {
        username: Object,
        userId: Number,
        user: Object,
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        closeDialog() {
            EventBus.$emit("closeUserDialog");
        },
        logoff() {
            socket.disconnect();

            Axios.post("logoff");
            EventBus.$emit("logoff");

            localStorage.removeItem("token");
            localStorage.removeItem("userInfor");
            this.$router.push({ name: "Login" });
        },
    },
};
</script>
<style scoped lang="scss">
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
.logoff {
    cursor: pointer;
}
</style>
