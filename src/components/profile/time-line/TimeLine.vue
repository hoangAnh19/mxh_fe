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
        this.getList();
        EventBus.$on("createPost", (post) => {
            this.listPost.unshift(post);
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
    watch: {
        user: function () {
            this.page = 1;
            this.getList();
        },
        group: function () {
            this.page = 1;
            this.getList();
        },
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
        };
    },
    methods: {
        getList() {
            if (this.ajaxLock) return;
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
    },
};
</script>
<style scoped lang="scss">
.time-line {
    text-align: left;
    padding: 0;
}
</style>
