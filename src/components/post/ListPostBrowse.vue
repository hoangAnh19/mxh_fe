<template>
    <div class="list-browse">
        <b-row>
            <b-col cols="6" offset="3">
                <PostBrowse v-for="post in listPost" :key="post" :post="post" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
import PostBrowse from "@/components/post/PostBrowse.vue";
import Axios from "@/components/Axios.js";

// import EventBus from "@/EventBus.js";
export default {
    name: "ListPosstBrowse",
    created() {
        this.getList(1);
    },
    watch: {
        user: function () {
            this.getList(1);
        },
        group: function () {
            this.getList(1);
        },
    },
    components: {
        PostBrowse,
    },
    props: {
        group_id: Number,
    },
    data() {
        return {
            listPost: [],
        };
    },
    methods: {
        getList(page) {
            var url =
                "post/get_list_post_browse?group_id=" +
                this.group_id +
                "&page=" +
                page;
            Axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.listPost = response.data.data;
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
    },
};
</script>
<style scoped lang="scss">
.list-browse {
    text-align: left;
    padding: 0;
}
</style>
