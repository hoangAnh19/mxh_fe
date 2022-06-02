<template>
    <div class="group">
        <Header v-bind:user="user" />
        <NavbarLeftGroup
            :listGroupManager="listGroupManager"
            :listGroupNomarl="listGroupNomarl"
        />
        <div class="body">
            <HomeGroup v-if="component == 1" />
            <CreateGroup v-if="component == 2" />
            <ListGroup :groups="listGroupManager" v-if="component == 3" />
            <ListGroup :groups="listGroupNomarl" v-if="component == 4" />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import NavbarLeftGroup from "@/components/group/NavBarLeftGroup.vue";
import EventBus from "@/EventBus.js";
import CreateGroup from "@/components/group/CreateGroup.vue";
import Axios from "@/components/Axios.js";
import HomeGroup from "@/components/group/HomeGroup.vue";
import ListGroup from "@/components/group/ListGroup.vue";
export default {
    name: "Groups",
    mounted() {},
    data() {
        return {
            ajaxLoadFriend: false,
            component: 1,
            listGroupManager: {},
            listGroupNomarl: {},
        };
    },
    async created() {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
        await Axios.get("group/get_list_group_nomarl")
            .then((response) => {
                if (response.data.status == "success") {
                    this.listGroupNomarl = response.data.group;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            });
        await Axios.get("group/get_list_group_manager")
            .then((response) => {
                if (response.data.status == "success") {
                    this.listGroupManager = response.data.group;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            });
        EventBus.$on("changeComponentGroups", (index) => {
            this.component = index;
        });
    },
    methods: {},
    components: {
        Header,
        NavbarLeftGroup,
        CreateGroup,
        HomeGroup,
        ListGroup,
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
