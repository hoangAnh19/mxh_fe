<template>
    <div class="home">
        <button
            class="btn btn-edit"
            v-on:click="change = false"
            v-show="isAdmin"
        >
            <b-icon icon="gear-fill"></b-icon> Chỉnh sửa
        </button>
        <button
            class="btn btn-create"
            v-on:click="create = true"
            v-show="isAdmin"
        >
            <b-icon icon="gear-fill"></b-icon> Taọ mới
        </button>

        <div v-for="item in listRoleGroup" :key="item">
            <b-form-textarea
                v-show="item.roleGroup"
                v-model="item.roleGroup"
                class="content"
                :disabled="this.change"
            ></b-form-textarea>
            <br />
        </div>

        <b-form-textarea
            v-show="create"
            v-model="textCreate"
            class="content"
        ></b-form-textarea>

        <button
            class="btn btn-create"
            v-on:click="
                updateListRoleGroup();
                createRoleGroup();
            "
            v-show="isAdmin"
        >
            Luư
        </button>
    </div>
</template>
<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
// import config from "@/config";
// import EventBus from "@/EventBus.js";
export default {
    name: "HomeGroup",
    props: {},
    created() {
        this.isAdmin =
            JSON.parse(localStorage.getItem("userInfo")).level === 4
                ? true
                : false;
        this.getListRoleGroup();
    },
    mounted() {},

    data() {
        return {
            change: true,
            create: false,
            message: "",
            listRoleGroup: [],
            textCreate: "",
        };
    },
    watch: {},

    methods: {
        getListRoleGroup() {
            Axios.get("group/roleGroup")
                .then((res) => {
                    if (res.data.status == "success") {
                        this.listRoleGroup = res.data.data;
                        console.log(this.listRoleGroup);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        async createRoleGroup() {
            if (this.textCreate) {
                Axios.post("group/createRoleGroup", {
                    roleGroup: this.textCreate,
                })
                    .then((response) => {
                        console.log(response);
                        this.create = false;
                    })
                    .catch(() => {});
                await this.getListRoleGroup();
            }
        },

        async updateListRoleGroup() {
            this.listRoleGroup.forEach((item) => {
                Axios.post("group/updateRoleGroup", {
                    id: item.id,
                    roleGroup: item.roleGroup,
                })
                    .then((response) => {
                        console.log(response);
                        this.change = true;
                    })
                    .catch(() => {});
            });
            await this.getListRoleGroup();
        },
    },
};
</script>
<style scoped lang="scss">
.home {
    width: 60%;
    margin: 20px auto 0 auto;
    background: #fff;
    min-height: 500px;

    background: white;
    padding: 10px 20px;
    border-radius: 10px;
    text-align: left;
}

li {
    font-size: 18px;
    margin-bottom: 10px;
}

.content {
    margin: 20px 0px 20px;
    padding: 10px;
    font-weight: 600;
}
.btn-edit {
    margin-top: 10px;
    margin-right: 20px;
    width: 30%;
    border: 2px solid rgb(111, 190, 73);
    color: rgb(88, 170, 44);
}
.btn-create {
    margin-top: 10px;
    margin-left: 200px;
    width: 30%;
    border: 2px solid rgb(111, 190, 73);
    color: rgb(88, 170, 44);
}
</style>
