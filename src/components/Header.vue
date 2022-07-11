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
                    <b-icon class="icon-search" icon="search"></b-icon>
                    <input placeholder="Tìm kiếm tại đây" />
                </div>
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
                        <router-link :to="{ name: 'Friend' }">
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
                            :to="{
                                name: 'Profile',
                                params: { userId: user.id },
                            }"
                        >
                            <img
                                v-if="user.avatar"
                                :src="
                                    'http://127.0.0.1:80/tmp_images/' +
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
                        <div class="notification"></div>
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
                            />
                        </div>
                    </b-col>
                </div>
            </b-col>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import UserDialog from "@/components/header/UserDialog.vue";
import EventBus from "@/EventBus.js";

export default {
    name: "Header",
    components: {
        UserDialog,
    },
    created() {
        this.isAdmin =
            JSON.parse(localStorage.getItem("userInfo")).level === 1
                ? true
                : false;
    },
    props: {
        user: Object,
    },
    data() {
        return {
            modalDialog: false,
            isAdmin: false,
        };
    },
    mounted() {
        EventBus.$on("closeUserDialog", () => {
            this.modalDialog = false;
        });
    },
};
</script>
<style scoped lang="scss">
.header {
    background-color: white;
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
</style>
