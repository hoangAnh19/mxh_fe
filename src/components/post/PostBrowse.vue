<template>
    <div v-if="display" class="form-post">
        <div class="d-flex">
            <div class="avatar">
                <img
                    v-if="post.user.avatar"
                    :src="
                        'http://127.0.0.1:8000/tmp_images/' + post.user.avatar
                    "
                />
                <img v-else src="@/assets/image/default-user-avatar.png" />
            </div>
            <div class="position-relative info-right">
                <router-link
                    :to="{ name: 'Profile', params: { userId: post.user.id } }"
                    class="full-name"
                    >{{ fullname(post.user) }}</router-link
                >
                <br />
                <br />
                <span
                    v-on:click="hiddenTypeShow = false"
                    style="font-size: 12px"
                >
                    {{ convertTime(post.created_at) }}
                </span>
            </div>
            <div class="icon-browse">
                <b-icon
                    icon="three-dots"
                    v-on:click="isShowBrowse = true"
                    v-click-outside="close"
                    style="cursor: pointer"
                ></b-icon>
                <div class="browse" v-if="isShowBrowse">
                    <div
                        v-on:click="browse"
                        class="browse-item"
                        style="border-bottom: 1px solid #f2f2f2"
                    >
                        Duyệt
                    </div>
                    <div v-on:click="cancel" class="browse-item">
                        Xóa bài viết
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="content">
                {{ post.data }}
            </div>
            <div
                v-if="images.length"
                class="img"
                style="overflow: hidden; position: relative"
            >
                <div
                    v-if="indexImage < countImage"
                    class="next-right"
                    v-on:click="nextImage(1)"
                >
                    <b-icon icon="chevron-right"></b-icon>
                </div>
                <div v-if="indexImage > 1" class="next-left">
                    <b-icon
                        icon="chevron-left"
                        v-on:click="nextImage(-1)"
                    ></b-icon>
                </div>
                <div class="images-wrapper">
                    <div class="images" :id="'images' + post.id">
                        <div
                            class="image"
                            v-for="(image, index) in images"
                            :key="index"
                        >
                            <img :src="config.url.image + image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";
import config from "@/config";

export default {
    computed: {},
    data() {
        return {
            images: JSON.parse(this.post.src_images) ?? [],
            images_share:
                JSON.parse((this.post.post_share ?? {}).src_images ?? "null") ??
                [],
            countImage: 0,
            owner: JSON.parse(localStorage.getItem("userInfo")),
            config: config,
            width_image: 0,
            positionX: 0,
            indexImage: 1,
            isShowBrowse: false,
            display: true,
        };
    },
    created() {},
    methods: {
        fullname: function (user) {
            return user.first_name + " " + user.last_name;
        },
        nextImage(param) {
            console.log(param);
            this.indexImage += param;
            this.positionX -= param * this.width_image;
            var slidechuyen = document.getElementById("images" + this.post.id);
            slidechuyen.style =
                "transform: translateX(" + this.positionX + "px)";
        },
        browse() {
            Axios.post("group/browser-post?post_id=" + this.post.id)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.display = false;
                        alert("Duyệt thành công");
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        },
        cancel() {
            Axios.post("group/cancel-post?post_id=" + this.post.id)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.display = false;
                        alert("Xóa thành công");
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        },
        close() {
            this.isShowBrowse = false;
        },
        convertTime(param) {
            if (param) {
                var date = new Date(param);
                return (
                    (date.getHours() < 10
                        ? "0" + date.getHours()
                        : date.getHours()) +
                    ":" +
                    (date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes()) +
                    " " +
                    (date.getDate() < 10
                        ? "0" + date.getDate()
                        : date.getDate()) +
                    "-" +
                    (date.getMonth() < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1) +
                    "-" +
                    (1900 + date.getYear())
                );
            } else return;
        },
    },
    mounted() {
        this.countImage = this.images.length;
        this.width_image = (
            document.getElementById("images" + this.post.id) ?? {}
        ).offsetWidth;
    },
    props: {
        post: Object,
    },
};
</script>
<style scoped lang="scss">
.count {
    padding: 5px 0;
}
.form-post {
    padding: 15px;
    padding-bottom: 5px;
    border-radius: 10px;
    background: white;
    word-wrap: break-word;
    margin: 20px 0;
}
.avatar_ img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto;
}
.avatar_comment img,
.avatar_answer img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.avatar,
.avatar_,
.avatar_comment,
.avatar_answer {
    display: flex;
    padding-right: 10px;
}
.avatar img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
.info-right {
    line-height: 16px;
    font-size: 14px;
    flex: 1;
    padding: 0;
}
.full-name {
    float: left;
    font-weight: 600;
    text-decoration: none;
    color: black;
}
.content {
    padding: 10px 0;
}
.like {
    flex: 1;
}
.share {
    margin-left: 10px;
}
.image {
    max-height: 100%;
    width: 100%;
    flex: 1 0 100%;
    display: flex;
}
.image img {
    width: 100%;
    object-fit: contain;
    margin: auto;
}
.images {
    display: flex;
    object-fit: contain;
    max-height: 100%;
    transition: transform 0.25s linear;
}
.images-wrapper {
    height: 450px;
    width: 100%;
    position: relative;
    left: 0;
}
.next-right,
.next-left {
    border-radius: 50%;
    background: #7c7272;
    padding: 3px;
    line-height: 16px;
    position: absolute;
    top: 48%;
    display: none;
    z-index: 1;
}
.img:hover .next-left,
.img:hover .next-right {
    cursor: pointer;
    display: block;
}
.next-left {
    left: 0;
}
.next-right {
    right: 0;
}
.interactive {
    border-top: 1px solid #f2f2f2;
    padding: 0 5px;
}
.icon-browse {
    position: relative;
}
.browse {
    position: absolute;
    width: 120px;
    bottom: 0;
    background-color: white;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.05) !important;
    border-radius: 10px;
}
.browse-item {
    padding: 10px;
}
.browse-item:hover {
    background-color: #f2f2f2;
}
</style>
