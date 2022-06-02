<template>
    <div class="list-friend" id="list-friend">
        <b-container>
            <div v-if="errors" class="text-center">
                <p>Đã có lỗi xảy ra, vui lòng thử lại</p>
            </div>
            <b-row v-else>
                <b-col cols="2" v-for="friend in friends" :key="friend">
                    <FriendElement v-bind:friend="friend" component="1" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import FriendElement from "@/components/friend/FriendElement.vue";
import config from "@/config";

export default {
    name: "ListFriend",
    created() {
        this.getListFriend();
        window.onscroll = () => {
            if (
                window.scrollY + window.innerHeight >=
                    document.body.scrollHeight + 80 &&
                !this.ajaxLock &&
                this.stillUser
            ) {
                this.getListFriend();
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
        getListFriend() {
            if (this.ajaxLock) return;
            this.ajaxLock = true;
            Axios.get("relationship/list_friend?page=" + this.page)
                .then((response) => {
                    if (response.data.status == "success") {
                        if (response.data.data.length < 18) {
                            this.stillUser = false;
                        }
                        response.data.data.forEach((x) => {
                            this.friends.push(x);
                        });
                        this.erros = "";
                        this.page++;
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
