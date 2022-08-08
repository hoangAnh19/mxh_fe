<template>
    <div class="list-user" id="list-user">
        <div class="top">
            <h2>Thành viên</h2>

            <input
                v-model="key_search"
                v-on:keyup="search(key_search)"
                class="form-input"
                placeholder="Lọc thành viên"
            />
            <button
                type="button"
                class="btn btn-secondary ms-3"
                v-on:click="
                    getListuser(1);
                    this.key_search = '';
                "
            >
                Tất cả
            </button>
        </div>

        <div class="list yesterday form-month">
            <div v-for="user in usersObject" :key="user" class="item">
                <div style="display: flex">
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
                    <router-link
                        :to="{
                            name: 'Profile',
                            params: { userId: user.id },
                        }"
                        class="fw-bold text-decoration-none link-user"
                        style="margin-left: 20px; min-width: 200px !important"
                    >
                        {{ user.first_name + " " + user.last_name }}
                    </router-link>

                    <div
                        style="
                            min-width: 200px !important;
                            margin-left: 20px;
                            font-size: 16px;
                            font-weight: 700;
                        "
                    >
                        Vị trí : {{ posis(user.level) }}
                    </div>
                    <div
                        v-if="user.workplace != null"
                        style="
                            min-width: 200px !important;
                            margin-left: 20px;
                            font-size: 16px;
                            font-weight: 700;
                        "
                    >
                        Đơn vị : {{ user.workplace }}
                    </div>
                </div>
            </div>
            <paginate
                :page-count="sumPage"
                :click-handler="getListuser"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                style="margin-left: 310px"
            >
            </paginate>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import config from "@/config";
import Paginate from "vuejs-paginate-next";

export default {
    name: "ListUser",
    created() {
        this.getListuser(1);
    },
    props: {},
    data() {
        return {
            sumPage: 10,
            config: config,
            usersObject: {},
            errors: "",
            stillUser: true,
            i: 1,
            key_search: "",
        };
    },
    components: {
        Paginate,
    },
    watch: {},
    methods: {
        search(data) {
            Axios.get("user/searchUser?user_name=" + data).then((response) => {
                if (response.data.status == "success") {
                    this.usersObject = response.data.data;
                }
            });
        },

        getListuser(pageNumber) {
            Axios.get("user/list_user?page=" + pageNumber).then((response) => {
                if (response.data.status == "success") {
                    this.usersObject = response.data.data[0];
                    this.sumPage = Math.floor(response.data.data[1] / 6 + 1);

                    this.erros = "";
                } else {
                    this.errors = response.data.message;
                }
            });
        },

        posis(id) {
            if (id === 4) return "Ban giám đốc";
            if (id === 3) return "Trưởng phòng";
            if (id === 2) return "Phó phòng";
            if (id === 1) return "Nhân viên";
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

.list-user {
    width: 75%;
    margin: 20px auto 0 auto;
}
</style>
