<template>
    <div class="list-friend" id="list-friend">
        <!-- <b-container>
            <div v-if="errors" class="text-center">
                <p>Đã có lỗi xảy ra, vui lòng thử lại</p>
            </div>
            <b-row v-else>
                <b-col cols="2" v-for="friend in friends" :key="friend">
                    <FriendElement v-bind:friend="friend" component="1" />
                </b-col>
            </b-row>
        </b-container> -->
        <div>danh sach 1</div>
        <li v-for="friend in friendsObject" :key="friend">
            {{ friend.last_name }}
        </li>
        <div>danh sach 2</div>
        {{ this.friends }}
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
// import FriendElement from "@/components/friend/FriendElement.vue";
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
            friendsObject: {},
            friends: [],
            errors: "",
            page: 1,
            ajaxLock: false,
            stillUser: true,
            i: 1,
        };
    },
    components: {
        // FriendElement,
    },
    watch: {},
    methods: {
        getListFriend() {
            if (this.ajaxLock) return;
            this.ajaxLock = true;
            Axios.get("relationship/list_friend1?page=" + this.page)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.friendsObject = response.data.data;
                        console.log("response", response);
                        console.log("response.data", response.data);
                        console.log("response.data.data", response.data.data);

                        response.data.data.forEach((x) => {
                            this.friends.push(x);
                            console.log(x);
                        });
                        console.log("friends[]", this.friends);

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
