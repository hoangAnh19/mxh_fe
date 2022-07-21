<template>
    <div class="profile-top">
        <img
            v-if="user.avatar"
            class="avatar"
            :src="config.url.image + user.avatar"
        />
        <img
            class="avatar"
            v-else
            src="@/assets/image/default-user-avatar.png"
        />

        <div class="row cover">
            <b-col class="p-0" cols="12">
                <img
                    v-if="user.cover"
                    class="cover"
                    :src="'http://127.0.0.1:8000/tmp_images/' + user.cover"
                />
            </b-col>
        </div>

        <div class="row content mt-5 pt-4">
            <b-col cols="12">
                <div class="user-name h3 fw-bold">
                    {{ user.first_name + " " + user.last_name }}
                </div>
                <div class="story">{{ user.story }}</div>
            </b-col>
        </div>
        <div class="row navbars">
            <b-col cols="6">
                <b-row>
                    <b-col
                        cols="4"
                        class="cursor-pointer nav-bar-top time-line p-3 fw-bold"
                        v-on:click="changeComponent(1)"
                        >Dòng thời gian</b-col
                    >
                    <b-col
                        cols="4"
                        class="cursor-pointer nav-bar-top introduce p-3 fw-bold"
                        v-on:click="changeComponent(2)"
                        >Giới thiệu</b-col
                    >
                    <b-col
                        cols="2"
                        class="cursor-pointer nav-bar-top introduce p-3 fw-bold"
                        v-on:click="changeComponent(4)"
                        >Ảnh</b-col
                    >
                </b-row>
            </b-col>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import config from "@/config";
import EventBus from "@/EventBus.js";
export default {
    name: "ProfileTop",

    props: {
        user: Object,
    },
    data() {
        return {
            config: config,
            component: 1,
        };
    },
    watch: {},
    mounted() {},
    methods: {
        changeComponent(index) {
            if (this.component !== index) {
                this.component = index;
                EventBus.$emit("changeComponentProfile", index);
            }
        },
    },
};
</script>
<style scoped lang="scss">
.text-orange {
    color: #ffa500;
}
.profile-top {
    background: white;
    padding: 0;
}
.avatar {
    width: 150px;
    height: 150px;
    font-size: 110px;
    margin: 0 auto;
}
a {
    text-decoration: none;
    color: black;
}
.item {
    text-align: left;
}
.cover {
    width: 100%;
    height: 300px;
    margin: 0;
}
.avatar {
    position: absolute;
    top: 150px;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: translateX(-50%);
    border: 5px white solid;
}
.content {
    text-align: center;
}
.drop_follow,
.drop_setting {
    transform: translate(25%, 0);
    background-color: white;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 10px 30px;
}
.drop_follow {
    left: 0;
    right: -20%;
}
.drop_setting {
    left: -30px;
    right: -50px;
}
</style>
