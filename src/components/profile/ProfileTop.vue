<template>
    <div class="profile-top">
        <lightgallery :settings="{ speed: 500, plugins: plugins }">
            <a
                class="gallery-item"
                :href="config.url.image + user.avatar"
                data-lg-size="1406-1390"
            >
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
            </a>
        </lightgallery>

        <div class="row cover">
            <b-col class="p-0" cols="12">
                <lightgallery :settings="{ speed: 500, plugins: plugins }">
                    <a
                        class="gallery-item"
                        :href="'http://127.0.0.1:8000/tmp_images/' + user.cover"
                        data-lg-size="1406-1390"
                    >
                        <img
                            v-if="user.cover"
                            class="cover"
                            :src="
                                'http://127.0.0.1:8000/tmp_images/' + user.cover
                            "
                        />
                    </a>
                </lightgallery>
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
                        v-on:click="changeComponent(3)"
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
import Lightgallery from "lightgallery/vue";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";

export default {
    name: "ProfileTop",
    components: { Lightgallery },

    props: {
        user: Object,
    },
    data() {
        return {
            plugins: [lgZoom, lgVideo],
            config: config,
            component: 1,
        };
    },
    watch: {},
    mounted() {},
    methods: {
        onInit: () => {
            console.log("lightGallery has been initialized");
        },
        onBeforeSlide: () => {
            console.log("calling before slide");
        },
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
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-zoom.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-video.css");
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
.gallery-item {
    margin: 5px;
}
</style>
