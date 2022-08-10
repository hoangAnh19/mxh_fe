<template>
    <div class="User">
        <Header v-bind:user="user" />
        <NavbarLeftUser />
        <div class="body">
            <ListUser v-if="component == 1" />
            <Birthday v-if="component == 2" />
            <TestUserVue v-if="component == 3" />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import EventBus from "@/EventBus.js";
import NavbarLeftUser from "@/components/user/NavBarLeftUser.vue";
import ListUser from "@/components/user/ListUser.vue";
import Birthday from "@/components/user/Birthday.vue";
import TestUserVue from "../components/user/TestUser.vue";
export default {
    name: "User",
    mounted() {
        EventBus.$on("changeComponentUser", (type) => {
            this.component = type;
        });
    },
    data() {
        return {
            component: 3,
        };
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
    },
    methods: {},
    components: {
        Header,
        NavbarLeftUser,
        ListUser,
        Birthday,
        TestUserVue,
    },
};
</script>
<style scoped lang="scss">
.body {
    margin-top: 80px;
    padding: 10px;
    margin-left: 350px;
}
</style>
ừ
