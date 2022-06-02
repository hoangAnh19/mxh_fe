<template>
    <div class="list-request-friend">
        <div v-if="errors" class="text-center">
            <p>Đã có lỗi xảy ra, vui lòng thử lại</p>
        </div>
        <b-row v-else>
            <b-col cols="2" v-for="friend in friends" :key="friend">
                <FriendElement v-bind:friend="friend" component="1" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import FriendElement from "@/components/friend/FriendElement.vue";
import config from "@/config";
// import Paginate from "vuejs-paginate";
// eslint-disable-next-line no-undef
// Vue.component("paginate", Paginate);

export default {
    name: "ListFriend",
    created() {
        this.getListFriendSuggestions();
        window.onscroll = () => {
            if (
                window.scrollY + window.innerHeight >=
                    document.body.scrollHeight + 80 &&
                !this.ajaxLock &&
                this.stillUser
            ) {
                this.getListFriendSuggestions();
            }
        };
    },
    props: {},
    data() {
        return {
            config: config,
            friends: [],
            errors: "",
            page: 1,
            ajaxLock: false,
            stillUser: true,
        };
    },
    components: {
        FriendElement,
    },
    watch: {},
    methods: {
        getListFriendSuggestions() {
            if (this.ajaxLock) return;
            this.ajaxLock = true;
            Axios.get("relationship/list_friend_suggestions?page=" + this.page)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.erros = "";
                        this.page++;
                        // if (response.data.data.length < 18) {
                        //   this.stillUser = false;
                        // }
                        response.data.data.forEach((x) => {
                            this.friends.push(x);
                        });
                    } else {
                        this.errors = response.data.message;
                    }
                    this.ajaxLock = false;
                })
                .catch(() => {
                    this.ajaxLock = false;
                    alert("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        },
    },
};
</script>
<style scoped lang="scss"></style>
