<template>
    <div class="list-friend" id="list-friend">
        <div class="top">
            <h2>Thành viên</h2>

            <input
                v-model="key_search"
                v-on:keyup="search(key_search)"
                class="form-input"
                placeholder="Lọc thành viên"
            />
        </div>

        <div class="list yesterday form-month">
            <div v-for="friend in friendsObject" :key="friend" class="item">
                <div style="display: flex">
                    <img
                        v-if="friend.avatar"
                        class="avatar"
                        :src="config.url.image + friend.avatar"
                    />
                    <img
                        class="avatar"
                        v-else
                        src="@/assets/image/default-user-avatar.png"
                    />
                    <router-link
                        :to="{
                            name: 'Profile',
                            params: { userId: friend.id },
                        }"
                        class="fw-bold text-decoration-none link-user"
                        style="margin-left: 20px; min-width: 200px !important"
                    >
                        {{ friend.first_name + " " + friend.last_name }}
                    </router-link>

                    <div
                        v-if="friend.workplace != null"
                        style="
                            margin-left: 20px;
                            font-size: 16px;
                            font-weight: 700;
                        "
                    >
                        Vị trí công việc : {{ friend.workplace }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
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
            friends: {},
            errors: "",
            page: 1,
            ajaxLock: false,
            stillUser: true,
            i: 1,
            key_search: "",
        };
    },
    components: {
        // FriendElement,
    },
    watch: {},
    methods: {
        search(data) {
            Axios.get("user/searchUser?user_name=" + data).then((response) => {
                if (response.data.status == "success") {
                    this.friendsObject = response.data.data;
                }
            });
        },

        getListFriend() {
            if (this.ajaxLock) return;
            this.ajaxLock = true;
            Axios.get("relationship/list_friend1?page=" + this.page).then(
                (response) => {
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
                }
            );
        },
    },
};
</script>
<style scoped lang="scss">
.avatar {
    width: 70px;
    height: 70px;
    border: 1px solid rgb(145, 94, 94);
    border-radius: 50%;
}

.form-input {
    margin-left: auto;
    display: block;
    width: 30%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: 20px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
input:focus {
    outline: none;
}

.top {
    display: flex;
    margin-bottom: 20px;
}

.item {
    display: block !important;
}
.list {
    text-align: initial;
    padding: 10px;
}
.form-month {
    border-radius: 20px;
    background-color: white;
    margin: 20px 0;
}

.list-friend {
    width: 60%;
    margin: 20px auto 0 auto;
}
</style>
