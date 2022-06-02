<template>
    <div class="profile">
        <Header v-bind:user="user" />
        <h1>Profile</h1>
        <b-row class="body" v-if="is_prevent == 2">
            <b-col>
                <div class="mt-2">
                    <div class="row">
                        <b-col cols="8" offset="2">
                            <ProfileTop v-bind:user="user1" />
                        </b-col>
                    </div>
                    <div v-if="component == 1" class="row mt-4">
                        <b-col cols="3" offset="2">
                            <NavBarLeftProfile v-bind:user="user1" />
                        </b-col>
                        <b-col cols="5">
                            <TimeLine v-bind:user="user1" type_="profile" />
                        </b-col>
                    </div>
                    <div v-if="component == 2" class="row mt-4">
                        <Info v-bind:user="user1" />
                    </div>
                    <div v-if="component == 3" class="row mt-4">
                        <ListFriend v-bind:userId="user1.id" />
                    </div>
                    <div v-if="component == 4" class="row mt-4">
                        <b-col cols="8" offset="2">
                            <ListImage v-bind:user="user1.id" />
                        </b-col>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ProfileTop from "@/components/profile/ProfileTop.vue";
import ListImage from "@/components/image/ListImage.vue";
import TimeLine from "@/components/profile/time-line/TimeLine.vue";
import Info from "@/components/profile/info/Info.vue";
import ListFriend from "@/components/profile/listFriend/ListFriend.vue";
import NavBarLeftProfile from "@/components/profile/time-line/NavBarLeftProfile.vue";
import Axios from "@/components/Axios.js";
import EventBus from "@/EventBus.js";

export default {
    name: "Profile",
    watch: {
        "$route.params.userId": function (id) {
            if (id) {
                this.getUserInfo(id);
                this.component = 1;
                window.scrollTo(0, 0);
            }
        },
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
        this.getUserInfo(this.$route.params.userId);
    },
    mounted() {
        EventBus.$on("changeComponentProfile", (id) => {
            this.component = id;
        });
        EventBus.$on("user", (data) => {
            this.user = data;
            this.user1 = data;
        });
    },
    data() {
        return {
            user: "",
            user1: "",
            component: 1,
            is_prevent: true,
        };
    },

    methods: {
        getUserInfo(id) {
            var user = JSON.parse(localStorage.getItem("userInfo"));
            if (id == JSON.parse(localStorage.getItem("userInfo")).id) {
                this.is_prevent = 2;
                this.user1 = user;
                return;
            }
            this.user = JSON.parse(localStorage.getItem("userInfo"));
            Axios.get("user?user_id=" + id)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.is_prevent = 2;
                        this.user1 = response.data.data;
                    } else {
                        alert("Tài khoản không tồn tại");
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
    },
    components: {
        Header,
        ProfileTop,
        NavBarLeftProfile,
        TimeLine,
        Info,
        ListFriend,
        ListImage,
    },
};
</script>
<style scoped lang="scss">
.body {
    position: relative;
    margin-top: 80px;
}
</style>
