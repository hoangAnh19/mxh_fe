<template>
    <div class="nav-left">
        <div class="row introduce">
            <div class="col-12 introduce-title p-4">Giới thiệu</div>
            <div class="item">
                <b-icon class="icon" icon="clock-fill"></b-icon>
                <span class="title"> Tham gia công ty vào </span>
                {{ parseDate(user.created_at.slice(0, 10)) }}
            </div>
            <div class="item">
                <b-icon class="icon" icon="house-door-fill"> </b-icon>
                <span class="title">Tốt nghiệp trường</span>
                {{ user.education ? user.education : "chưa cập nhật" }}
            </div>

            <div class="item">
                <b-icon class="icon border-info" icon="briefcase-fill"></b-icon>
                <span class="title"> Vị trí công việc </span>
                {{ user.workplace ? user.workplace : "chưa cập nhật" }}
            </div>

            <div class="item">
                <b-icon class="icon" icon="gift-fill"></b-icon>
                <span class="title"> Sinh nhật </span>{{ user.bird_day }}
            </div>
            <div class="item">
                <b-icon class="icon" icon="telephone-fill"></b-icon>
                <span class="title"> Số điện thoại </span>
                {{ user.phone ? user.phone : "chưa cập nhật" }}
            </div>
            <div class="item">
                <b-icon class="icon" icon="mailbox2"></b-icon>
                <span class="title">Email </span>
                {{ user.email }}
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import parse from "@/parse";
export default {
    name: "NavBarLeftProfile",
    created() {
        this.reload();
    },
    props: {
        user: Object,
    },
    data() {
        return {
            education: "",
            workplace: "",
        };
    },
    watch: {
        user: function () {
            this.reload();
        },
    },
    methods: {
        reload() {},

        parseDate(date) {
            return parse.parseDate(date);
        },
    },
};
</script>
<style scoped lang="scss">
.nav-left {
    background: white;
    position: sticky;
    top: 85px;
    padding: 0;
}
.introduce-title {
    text-align: left;
    font-size: 25px;
    font-weight: 700;
}
.item {
    text-align: left;
    padding: 10px;
    padding-left: 25px;
}
.icon {
    margin-right: 10px;
}
.title {
    font-weight: 600;
}
</style>
