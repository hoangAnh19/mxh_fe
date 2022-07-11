<template>Quan ly thanh vien</template>

<script>
// @ is an alias to /src
// import EventBus from "@/EventBus.js";

export default {
    name: "ManagerUser",
    components: {},

    data() {
        return {
            listGroup: [],
        };
    },
    methods: {},
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
.cover {
    display: flex;
}
.cover img {
    width: 50px;
    height: 50px;
    margin: auto;
    border-radius: 10px;
}
</style>
