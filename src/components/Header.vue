<template>
    <div class="header">
        <div class="row position-relative">
            <b-col class="logo-search" cols="1" md="1" lg="2">
                <a href="#">
                    <router-link v-if="isAdmin" :to="{ name: 'ManagerUser' }">
                        <img
                            v-on:click="$router.push({ name: 'ManagerUser' })"
                            class="logo"
                            src="@/assets/Logo-Network.jpg"
                        />
                    </router-link>
                    <router-link v-else :to="{ name: 'Home' }">
                        <img
                            v-on:click="$router.push({ name: 'Home' })"
                            class="logo"
                            src="@/assets/Logo-Network.jpg"
                        />
                    </router-link>
                </a>
                <div class="search" v-show="!isAdmin">
                    <input
                        style="background: darkseagreen; min-width: 200px"
                        placeholder="Tìm kiếm tại đây"
                        v-model="key_search"
                    />
                    <b-icon class="icon-search" icon="search"></b-icon>
                </div>

                <button
                    style="
                        background: darkseagreen;
                        min-width: 120px;
                        margin-left: 10px;
                        font-weight: 700;
                        border: aliceblue;
                    "
                    v-on:click="search()"
                    v-show="!isAdmin"
                >
                    Tìm kiếm
                </button>
            </b-col>
            <!-- d-sm-none -->
            <b-col
                class="navbar-main d-md-block d-none"
                md="6"
                lg="4"
                offset-lg="2"
                offset-md="2"
                v-show="!isAdmin"
            >
                <div class="row" v-show="!isAdmin">
                    <b-col class="navbar-main-icon" cols="3">
                        <router-link :to="{ name: 'Home' }">
                            <b-icon icon="house"></b-icon>
                        </router-link>
                    </b-col>
                    <b-col class="navbar-main-icon" cols="3">
                        <router-link :to="{ name: 'ListUser' }">
                            <b-icon icon="people"></b-icon>
                        </router-link>
                    </b-col>
                    <b-col class="navbar-main-icon" cols="3">
                        <router-link :to="{ name: 'Groups' }">
                            <b-icon icon="globe"></b-icon>
                        </router-link>
                    </b-col>
                    <b-col class="navbar-main-icon" cols="3">
                        <router-link :to="{ name: 'Chat' }">
                            <b-icon icon="chat-right-dots"></b-icon>
                        </router-link>
                    </b-col>
                </div>
            </b-col>
            <b-col
                class="navbar-right"
                cols="1"
                offset-lg="2"
                md="3"
                lg="2"
                v-show="!isAdmin"
            >
                <div class="row">
                    <b-col class="navbar-right-icon" cols="6">
                        <router-link
                            v-if="user.id"
                            :to="{
                                name: 'Profile',
                                params: { userId: user.id },
                            }"
                        >
                            <img
                                v-if="user.avatar"
                                :src="
                                    'http://127.0.0.1:8000/file_upload/' +
                                    user.avatar
                                "
                                class="rounded-circle bg-secondary"
                                style="width: 40px; height: 40px"
                            />
                            <b-icon
                                v-else
                                icon="person"
                                class="rounded-circle bg-secondary p-2"
                            ></b-icon>
                            <span style="margin-left: 5px">{{
                                user.last_name
                            }}</span>
                        </router-link>
                    </b-col>
                    <b-col class="navbar-right-icon" cols="3">
                        <div
                            class="notification"
                            style="display: flex"
                            v-on:click="showListNoti()"
                        >
                            <b-icon icon="bell-fill"> </b-icon>
                            <span v-if="numNoti" class="icon-button__badge">{{
                                numNoti
                            }}</span>
                        </div>
                    </b-col>
                    <b-col class="navbar-right-icon" cols="3">
                        <div class="drop-down">
                            <b-icon
                                icon="caret-down-fill"
                                class="rounded-circle bg-secondary p-2"
                                v-on:click="modalDialog = true"
                            ></b-icon>
                            <UserDialog
                                v-if="modalDialog"
                                v-bind:username="
                                    user.first_name + ' ' + user.last_name
                                "
                                v-bind:userId="user.id"
                                v-bind:user="user"
                            />
                        </div>
                    </b-col>
                </div>
            </b-col>
        </div>
    </div>
    <div v-if="modal_share">
        <div class="modal-dialog1">
            <div class="modal-content1" v-click-outside="closeModalListShare">
                <div class="share-header">
                    <span class="fw-bold fs-3">Danh sách thông báo</span>
                </div>
                <div v-for="item in listNoti" :key="item" class="listNoti">
                    <span>
                        <router-link
                            v-if="item.type != 4"
                            class="link"
                            :to="{
                                name: 'Post',
                                params: { postId: item.post_id },
                            }"
                        >
                            <div class="d-flex">
                                <img
                                    v-if="item.user_2.avatar"
                                    :src="
                                        'http://127.0.0.1:8000/file_upload/' +
                                        item.user_2.avatar
                                    "
                                    class="rounded-circle bg-secondary"
                                    style="width: 60px; height: 60px"
                                />
                                <img
                                    class="rounded-circle bg-secondary"
                                    style="width: 60px; height: 60px"
                                    v-else
                                    src="@/assets/image/default-user-avatar.png"
                                />
                                <div
                                    class="ms-3"
                                    v-on:click="updateNoti(item.id)"
                                >
                                    <span class="fw-bold fs-5">
                                        {{
                                            item.user_2.first_name +
                                            " " +
                                            item.user_2.last_name
                                        }}</span
                                    >
                                    <b-icon
                                        v-if="item.seen == 0"
                                        icon="record-fill"
                                    ></b-icon>
                                    <br />
                                    <span v-if="item.type === 1"
                                        >Đã like bài viết của bạn</span
                                    >
                                    <span v-if="item.type === 2"
                                        >Đã bình luận bài viết của bạn</span
                                    >
                                    <span v-if="item.type === 3"
                                        >Đã share bài viết của bạn</span
                                    >

                                    <br />
                                    <span class="fst-italic">{{
                                        parseDate(item.created_at)
                                    }}</span>
                                    <br />
                                </div>
                            </div>
                        </router-link>
                        <router-link
                            v-else
                            class="link"
                            :to="{
                                name: 'Profile',
                                params: { userId: user.id },
                            }"
                        >
                            <div
                                class="d-flex"
                                v-on:click="updateNoti(item.id)"
                            >
                                <img
                                    v-if="item.user_2.avatar"
                                    :src="
                                        'http://127.0.0.1:8000/file_upload/' +
                                        item.user_2.avatar
                                    "
                                    class="rounded-circle bg-secondary"
                                    style="width: 60px; height: 60px"
                                />
                                <img
                                    class="rounded-circle bg-secondary"
                                    style="width: 60px; height: 60px"
                                    v-else
                                    src="@/assets/image/default-user-avatar.png"
                                />
                                <div class="ms-3">
                                    <span class="fw-bold fs-5">
                                        {{
                                            item.user_2.first_name +
                                            " " +
                                            item.user_2.last_name
                                        }}</span
                                    >
                                    <b-icon
                                        v-if="item.seen == 0"
                                        icon="record-fill"
                                    ></b-icon>
                                    <br />
                                    <span v-if="item.type === 4"
                                        >Đã đăng bài viết trên trang cá nhân
                                        bạn</span
                                    >

                                    <br />
                                    <span class="fst-italic">{{
                                        parseDate(item.created_at)
                                    }}</span>
                                    <br />
                                </div>
                            </div>
                        </router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import UserDialog from "@/components/header/UserDialog.vue";
import Axios from "@/components/Axios.js";
// import parse from "@/parse";

import EventBus from "@/EventBus.js";

export default {
    name: "Header",
    components: {
        UserDialog,
    },
    created() {
        this.isAdmin =
            JSON.parse(localStorage.getItem("userInfo")).level === 5
                ? true
                : false;
        this.getNoti();

        EventBus.$on("newPost", () => {
            this.numNoti = 0;
            this.getNoti();
            console.log("Envenbus on new post");
        });

        EventBus.$on("newComment", () => {
            this.numNoti = 0;
            this.getNoti();
        });
    },
    props: {
        user: Object,
    },
    data() {
        return {
            user_id: 0,
            modalDialog: false,
            isAdmin: false,
            key_search: "",
            modal_share: false,
            numNoti: 0,
            listNoti: [],
        };
    },
    mounted() {
        EventBus.$on("closeUserDialog", () => {
            console.log("Evenbus_On_closeUser in Header file");
            this.modalDialog = false;
        });
    },
    methods: {
        parseDate(date) {
            return date.slice(11, 20) + date.slice(0, 10);
        },
        search() {
            EventBus.$emit("searchPost", this.key_search);
        },
        showListNoti() {
            this.modal_share = true;
        },
        closeModalListShare() {
            this.modal_share = false;
        },
        getNoti() {
            Axios.get("notification/get?user_id=" + this.user.id)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.listNoti = response.data.data;
                        this.listNoti.forEach((item) => {
                            if (item.seen === 0) this.numNoti += 1;
                            console.log(this.numNoti);
                        });
                        console.log("get listNoti", this.listNoti);
                    } else {
                        console.log(this.data.message);
                    }
                })
                .catch(() => {});
        },

        updateNoti(id) {
            Axios.post("notification/update", {
                noti_id: id,
            })
                .then(() => {})
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        },
    },
};
</script>
<style scoped lang="scss">
.header {
    background-color: darkseagreen;
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    height: 80px;
    padding: 0px 20px;
    z-index: 1;
}
.position-relative {
    height: 100%;
}
.logo-search {
    display: flex;
}
.logo {
    margin-top: 10px;
    width: 60px;
    object-fit: contain;
}
.search {
    flex: 1;
    margin: auto;
    display: flex;
    height: 45px;
    margin-left: 10px;
    border: 1px solid rgb(48, 40, 40);
    border-radius: 25px;
    padding: 10px;
}
.navbar-main-icon,
.navbar-right-icon {
    display: flex;
    height: 100%;
    text-align: center;
}
.navbar-main-icon a,
.navbar-right-icon a,
.notification,
.drop-down {
    text-decoration: none;
    margin: auto;
    color: black;
}
.navbar-main-icon svg {
    font-size: 25px;
}
.navbar-right-icon svg {
    font-size: 40px;
}
.navbar-right-icon span {
    margin: auto;
}
.search > input {
    padding: 0 0 0 10px;
    border: 0;
    width: 0px;
    flex: 1;
}
.search > input:focus {
    outline: none;
}
.icon-search {
    width: 15px;
    height: 15px;
    margin: auto;
}

.navbar-main > .row,
.navbar-right > .row {
    height: 100%;
}
.user-dialog {
    right: 0;
    width: 250px;
    height: 370px;
    position: absolute;
    border-radius: 10px;
}
.icon-button__badge {
    position: absolute;
    top: 5px;
    width: 25px;
    height: 25px;
    background: red;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}
.modal1 {
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    opacity: 0.6;
    opacity: 0.6;
    background: #000;
}
.modal-dialog1 {
    margin-left: auto;
    z-index: 51;
    position: fixed;
    width: 30%;
    top: 10%;
    right: 0;
    bottom: 0;
    left: 0;
}
.modal-content1 {
    position: relative;
    width: 70%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 1.3rem;
    outline: 0;
    background: aliceblue;
    height: 65%;
    overflow: auto !important;
}
.listNoti {
    margin-bottom: 10px;
    border-bottom: 1px;
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
</style>
