<template>
    <div class="nav-left">
        <div v-on:click="changeComponentFriend(1)" class="item">
            <b-icon class="icon-item" icon="person-lines-fill"></b-icon>
            Thành viên
        </div>
        <div v-on:click="changeComponentFriend(2)" class="item">
            <b-icon class="icon-item" icon="calendar-fill"></b-icon> Sinh nhật
        </div>
        <div v-on:click="changeComponentFriend(3)" class="item">
            <b-icon class="icon-item" icon="calendar-fill"></b-icon> Test
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import EventBus from "@/EventBus.js";

export default {
    name: "NavBarLeftFriend",
    created() {},
    props: {},
    data() {
        return {};
    },
    watch: {},
    methods: {
        changeComponentFriend(index) {
            EventBus.$emit("changeComponentFriend", index);
        },
    },
};
</script>
<style scoped lang="scss">
.nav-left {
    background: white;
    padding: 0;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.05), 0 0 2px rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 80px;
    left: 0;
    width: 350px;
    bottom: 0;
    padding-top: 30px;
}
.item {
    font-size: 20px;
    text-align: left;
    padding: 15px;
    padding-left: 20px;
}
.item:hover {
    cursor: pointer;
    background-color: #f2f2f2;
    padding-left: 30px;
}
.icon-item {
    margin-right: 5px;
}
</style>
