<template>
    <div class="left-groups">
        <div class="title">Các phòng ban</div>
        <div
            class="btn btn-outline-primary"
            style="width: 90%"
            v-on:click="changeComponent(1)"
        >
            <b-icon icon="card-checklist"></b-icon> Quy định
        </div>

        <button
            class="btn btn-create"
            v-on:click="changeComponent(2)"
            v-show="isAdmin"
        >
            <b-icon icon="plus-circle-fill"></b-icon> Tạo phòng mới
        </button>

        <router-link
            class="btn btn-create"
            :to="{ name: 'ManagerGroup' }"
            v-show="isAdmin"
        >
            <div class="div-icon"></div>
            <div style="margin: auto 10px">
                <b-icon icon="gear-fill" aria-hidden="true"></b-icon> Quản lý
                group
            </div>
        </router-link>

        <div class="manager" v-if="listGroupManager.length">
            <div class="title-1">
                phòng bạn quản lý
                <span class="view-all" v-on:click="changeComponent(3)"
                    >Xem tất cả</span
                >
            </div>
            <div class="list_group_manager">
                <div
                    v-for="item in listGroupManager.length < 3
                        ? listGroupManager.length
                        : 3"
                    class="d-flex group_manager_item"
                    :key="item"
                >
                    <div class="cover">
                        <img
                            v-if="listGroupManager[item - 1].cover"
                            :src="
                                'http://127.0.0.1:8000/file_upload/' +
                                listGroupManager[item - 1].cover
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                        />
                    </div>
                    <div class="mx-2" style="flex: 1">
                        <router-link
                            :to="{
                                name: 'Group',
                                params: {
                                    groupId: listGroupManager[item - 1].id,
                                },
                            }"
                            class="user-name fw-bold"
                        >
                            {{ listGroupManager[item - 1].name }}
                        </router-link>
                        <div>
                            {{ listGroupManager[item - 1].count_member }} thành
                            viên
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="participation" v-if="listGroupNomarl.length">
            <div class="title-1">
                phòng bạn tham gia
                <span class="view-all" v-on:click="changeComponent(4)"
                    >Xem tất cả</span
                >
            </div>
            <div class="list_group_nomarl">
                <div
                    v-for="item in listGroupNomarl.length < 3
                        ? listGroupNomarl.length
                        : 3"
                    class="d-flex group_normarl_item"
                    :key="item"
                >
                    <div class="cover">
                        <img
                            v-if="listGroupNomarl[item - 1].cover"
                            :src="
                                'http://127.0.0.1:8000/file_upload/' +
                                listGroupNomarl[item - 1].cover
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                        />
                    </div>
                    <div class="mx-2" style="flex: 1">
                        <router-link
                            :to="{
                                name: 'Group',
                                params: {
                                    groupId: listGroupNomarl[item - 1].id,
                                },
                            }"
                            class="user-name fw-bold"
                        >
                            {{ listGroupNomarl[item - 1].name }}
                        </router-link>
                        <div>
                            {{ listGroupNomarl[item - 1].count_member }} thành
                            viên
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="participation">
            <div class="title-1">
                Tất cả các phòng
                <span class="view-all" v-on:click="changeComponent(5)"
                    >Xem tất cả</span
                >
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import EventBus from "@/EventBus.js";
// import Axios from "@/components/Axios.js";

export default {
    name: "NavBarLeftGroup",
    created() {
        this.user = JSON.parse(localStorage.getItem("userInfo"));
        this.isAdmin =
            JSON.parse(localStorage.getItem("userInfo")).level === 4
                ? true
                : false;
    },
    props: {
        listGroupManager: {},
        listGroupNomarl: {},
        listAllGroup: {},
    },
    data() {
        return {
            isAdmin: false,
        };
    },
    watch: {},
    methods: {
        changeComponent(index) {
            EventBus.$emit("changeComponentGroups", index);
        },
    },
};
</script>
<style scoped lang="scss">
.left-groups {
    background: white;
    padding: 0;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.05), 0 0 2px rgba(0, 0, 0, 0.05);
    position: fixed;
    top: 80px;
    left: 0;
    width: 350px;
    bottom: 0;
    padding: 20px;
    border-top: 1px solid #f2f2f2;
    text-align: left;
    border-right: 1px solid #f2f2f2;
    overflow: auto;
    height: calc(100vh - 80px);
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
.title {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
}
.btn-create {
    margin-top: 10px;
    width: 90%;
    border: 2px solid rgb(111, 190, 73);
    color: rgb(88, 170, 44);
}
.manager,
.participation {
    margin-top: 20px;
}
.title-1 {
    border-top: 1px solid #f2f2f2;
    padding: 20px 0;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
}
.view-all {
    font-size: 14px;
    float: right;
    font-weight: 300;
    margin-top: 8px;
    color: rgb(88, 170, 44);
    cursor: pointer;
}
.cover {
    display: flex;
}
.cover img {
    width: 50px;
    height: 50px;
    margin: auto;
    border-radius: 10px;
}
.user-name {
    color: black;
    text-decoration: none;
}
.group_normarl_item,
.group_manager_item {
    margin-bottom: 20px;
}

.left-groups:hover::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.left-groups::-webkit-scrollbar {
    width: 5px !important;
    background: white;
}
.left-groups:hover::-webkit-scrollbar-thumb {
    background: #646668;
    height: 100px;
    border-radius: 5px;
}
</style>
