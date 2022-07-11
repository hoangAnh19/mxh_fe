<template>
    <div class="nav-left-home">
        <div class="link-component">
            <router-link class="d-flex link" :to="{ name: 'ManagerUser' }">
                <div class="div-icon">
                    <b-icon class="icon" icon="people-fill"></b-icon>
                </div>
                <div style="margin: auto 10px">Quản lý thành viên</div>
            </router-link>
            <router-link class="d-flex link" :to="{ name: 'Groups' }">
                <div class="div-icon">
                    <b-icon class="icon" icon="globe"></b-icon>
                </div>
                <div style="margin: auto 10px">Quản lý nhóm</div>
            </router-link>
            <router-link class="d-flex link" :to="{ name: 'CoreValue' }">
                <div class="div-icon">
                    <b-icon class="icon" icon="journal-check"></b-icon>
                </div>
                <div style="margin: auto 10px">Quản lý bài viết</div>
            </router-link>

            <div
                style="margin: auto 10px"
                v-on:click="logoff"
                class="px-6 my-3 logoff item"
            >
                <img src="@/assets/icon/icon-logout.svg" /> Đăng xuất
            </div>
        </div>
    </div>
</template>

<script>
import Axios from "@/components/Axios.js";
import EventBus from "@/EventBus.js";
import socket from "@/plugins/socket";
export default {
    name: "NavbarLeftAdmin",
    components: {},

    data() {
        return {
            listGroup: [],
        };
    },
    methods: {
        logoff() {
            socket.disconnect();

            Axios.post("logoff");
            EventBus.$emit("logoff");

            localStorage.removeItem("token");
            localStorage.removeItem("userInfor");
            this.$router.push({ name: "Login" });
        },
    },
    computed: {},
};
</script>
<style scoped lang="scss">
.avatar {
    display: flex;
}
.avatar img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto;
}
.div-icon .icon {
    width: 30px;
    height: 30px;
    margin: auto;
}
.group_item {
    margin-top: 20px;
}
.shortcuts {
    border-top: 1px solid #18191a;
    text-align: left;
}
.link {
    color: black;
    text-decoration: none;
    margin-bottom: 20px;
}
.nav-left-home {
    position: fixed;
    left: 0;
    top: 70px;
    padding: 30px 10px;
    margin-top: 10px;
    overflow: auto;
    width: 16.67%;
    height: calc(100vh - 80px);
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
.nav-left-home:hover::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.nav-left-home::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.nav-left-home:hover::-webkit-scrollbar-thumb {
    background: #646668;
    height: 100px;
    border-radius: 5px;
}
.title-shortcuts {
    padding: 10px 0;
    font-weight: 700;
}

.item {
    text-align: left;
}
.logoff {
    cursor: pointer;
}
</style>
