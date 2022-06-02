<template>
    <div class="post">
        <Header v-bind:user="user" />
        <b-row class="body">
            <b-col cols="8" offset="2">
                <b-row>
                    <b-col
                        cols="6"
                        v-if="post.id == $route.params.postId"
                        offset="3"
                    >
                        <ViewPost v-bind:post="post" />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Axios from "@/components/Axios.js";
import ViewPost from "@/components/post/ViewPost.vue";
import EventBus from "@/EventBus.js";

export default {
    name: "Post",
    watch: {
        "$route.params.postId": function (id) {
            if (id) {
                this.getPost(id);
                window.scrollTo(0, 0);
            }
        },
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
        this.getPost(this.$route.params.postId);
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
            user: {},
            post: {
                user: {},
                user_2: {},

                is_like: [],
            },
        };
    },

    methods: {
        async getPost(id) {
            this.user = JSON.parse(localStorage.getItem("userInfo"));
            await Axios.get("post/show?post_id=" + id)
                .then((response) => {
                    if (response.data.length) {
                        console.log(this.post);
                        this.post = response.data[0];
                        console.log(this.post);
                    } else {
                        alert("Bài viết không tồn tại");
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
    },
    components: {
        ViewPost,
        Header,
    },
};
</script>
<style scoped lang="scss">
.body {
    position: relative;
    margin-top: 80px;
    text-align: left;
}
</style>
