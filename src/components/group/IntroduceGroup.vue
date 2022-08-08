<template>
    <b-col cols="6" offset="3" class="introduce-group">
        <div class="title">
            <b-icon icon="pencil-square"></b-icon> Giới thiệu
        </div>
        <div class="px-2">{{ group.intro }}</div>
        <div class="content">
            <div v-if="group.regulations">
                <span class="title"
                    ><b-icon icon="book"></b-icon> Nội quy:</span
                >
                <div class="px-2">{{ group.regulations }}</div>
            </div>
            <div class="my-3" v-if="group.type == config.group.type.public">
                <b-icon icon="globe"></b-icon> phòng/ban công khai
            </div>
            <div v-else class="my-3">
                <b-icon icon="lock"></b-icon> phòng/ban riêng tư
            </div>
            <div class="my-3">
                <b-icon icon="clock"></b-icon> Đã tạo phòng/ban vào
                {{ historyGroup }}
            </div>
            <div class="my-3">
                <b-icon icon="text-left"></b-icon> Tổng cộng
                {{ count.post }} bài viết
            </div>
            <div class="my-3">
                <b-icon icon="people"></b-icon> Tổng cộng
                {{ count.person }} thành viên
            </div>
        </div>
    </b-col>
</template>
<script>
// @ is an alias to /src
import config from "@/config";
// import EventBus from "@/EventBus.js";
export default {
    name: "GroupTop",
    props: {
        group: Object,
        count: Object,
    },
    created() {},
    data() {
        return {
            config: config,
        };
    },
    watch: {},
    computed: {
        historyGroup: function () {
            var date = new Date(this.group.created_at);
            return (
                date.getDate() +
                " - " +
                (date.getMonth() + 1) +
                " - " +
                (1900 + date.getYear())
            );
        },
    },
    methods: {},
};
</script>
<style scoped lang="scss">
.introduce-group {
    margin-top: 30px;
    background: white;
    border-radius: 10px;
    padding: 16px;
    text-align: left;
}
.title {
    font-weight: 700;
}
.content {
    margin-top: 20px;
    border-top: 2px solid #f2f2f2;
    padding: 10px 0;
}
</style>
