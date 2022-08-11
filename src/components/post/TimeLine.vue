<template>
    <FormPost v-bind:user="user" v-bind:group="group"></FormPost>
    <div class="time-line">
        <ViewPost v-for="post in listPost" :key="post" :post="post" />
    </div>
</template>

<script>
// @ is an alias to /src
import FormPost from "@/components/post/FormPost.vue";
import ViewPost from "@/components/post/ViewPost.vue";
import Axios from "@/components/Axios.js";

import EventBus from "@/EventBus.js";
export default {
    name: "TimeLine",
    created() {
        console.log("created timeline", this.type_);
        this.getList();
        EventBus.$on("createPost", (post) => {
            this.listPost.unshift(post);
        });
        EventBus.$on("searchPost", (keySearch) => {
            console.log("EventBus.$on   searchPost", keySearch);

            if (!keySearch) {
                this.page = 1;
                this.listPost = [];
                console.log("get list");

                this.getList();
                console.log("page- listpost", this.page, this.listPost);
            } else {
                this.listPost = [];
                console.log("get search");

                this.getListSearch(keySearch);
            }
        });

        EventBus.$on("newPost", (data) => {
            console.log("new post", data);
            this.page = 1;
            this.listPost = [];

            // if (data !== JSON.parse(localStorage.getItem("userInfo")).id)
            this.getList();

            console.log("Envenbus on new post");
        });

        EventBus.$on("deletPost", () => {
            this.page = 1;
            this.listPost = [];
            this.getList();
        });

        EventBus.$on("newComment", (data) => {
            console.log("new comment", data);
            this.page = 1;
            this.listPost = [];
            this.getList();
            console.log("Envenbus on new comment");
        });

        window.onscroll = () => {
            console.log(
                window.scrollY,
                window.innerHeight,
                document.body.scrollHeight,
                !this.ajaxLock,
                this.stillPost
            );
            if (
                window.scrollY + window.innerHeight >=
                    document.body.scrollHeight &&
                !this.ajaxLock &&
                this.stillPost
            ) {
                this.getList();
            }
        };
    },

    components: {
        FormPost,
        ViewPost,
    },
    props: {
        user: Object,
        type_: String,
        group: Object,
    },
    data() {
        return {
            listPost: [],
            page: 1,
            ajaxLock: false,
            stillPost: true,
            i: 0,
        };
    },
    updated() {},
    methods: {
        getList() {
            this.ajaxLock = true;

            var url;
            switch (this.type_) {
                case "profile":
                    url =
                        "post/get_list?user_id=" +
                        this.user.id +
                        "&page=" +
                        this.page;
                    break;
                case "home":
                    url = "post/get_list?" + "&page=" + this.page;
                    break;
                case "group":
                    url =
                        "post/get_list?group_id=" +
                        this.group.id +
                        "&page=" +
                        this.page;
                    break;
            }
            Axios.get(url)
                .then((response) => {
                    response.data.data.forEach((item) => {
                        this.listPost.push(item);
                    });
                    if (response.data.data.length < 5 && this.page > 1) {
                        this.stillPost = false;
                    }
                    if (response.data.data.length < 3 && this.page == 1) {
                        this.stillPost = false;
                    }
                    this.page++;
                    this.ajaxLock = false;
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    this.ajaxLock = false;
                });
        },

        getListSearch(keySearch) {
            this.ajaxLock = true;

            var url;
            switch (this.type_) {
                case "home":
                    url = "post/get_list_search?" + "keySearch=" + keySearch;

                    break;
                case "group":
                    url =
                        "post/get_list_search?group_id=" +
                        this.group.id +
                        "&keySearch=" +
                        keySearch;

                    break;
            }
            Axios.get(url)
                .then((response) => {
                    this.listPost = [];
                    response.data.data.forEach((item) => {
                        this.listPost.push(item);
                    });
                    this.ajaxLock = false;
                    // if (this.type_ === "home")
                    //     window.scrollTo({ bottom: 200, behavior: "smooth" });
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    this.ajaxLock = false;
                });
        },
    },
};
</script>
<style scoped lang="scss">
.time-line {
    text-align: left;
    padding: 0;
}
</style>
