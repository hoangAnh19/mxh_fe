<template>
    <div class="list-user" id="list-user">
        <Header v-bind:user="user" />

        <NavbarLeftHome v-bind:user="user" />
        <div style="margin-top: 100px">
            <h2 style="font-weight: 700">Giá trị cốt lõi doanh nghiệp</h2>
            <div clss="group-btn">
                <button class="btn btn-outline-primary ms-4" @click="insertR()">
                    Thêm
                </button>
                <button
                    class="btn btn-outline-primary ms-4"
                    @click="change = false"
                >
                    Sửa
                </button>
                <button
                    class="btn btn-outline-primary ms-4"
                    @click="updateCoreValue"
                >
                    Luư
                </button>
            </div>

            <div v-for="item in coreValues" :key="item">
                <button
                    class="btn btn-outline-danger mb-2"
                    style="float: right"
                    v-on:click="deleteCoreValue(item.id)"
                >
                    Xóa
                </button>
                <b-form-textarea
                    v-model="item.CoreValue"
                    class="item-core"
                    :disabled="this.change"
                ></b-form-textarea>
            </div>
            <div v-for="item in insertValues" :key="item">
                <button
                    class="btn btn-outline-danger me-2"
                    style="float: right"
                    v-on:click="insertValues.length--"
                >
                    Xóa
                </button>
                <button
                    class="btn btn-outline-primary"
                    style="float: right"
                    @click="saveCoreValue"
                >
                    Lưu
                </button>
                <b-form-textarea
                    v-model="value"
                    class="item-core"
                ></b-form-textarea>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import config from "@/config";
import NavbarLeftHome from "@/components/home/NavbarLeftHome.vue";
import Header from "@/components/Header.vue";

export default {
    name: "CoreValue",
    created() {
        this.getListCoreValue();
        this.user = JSON.parse(localStorage.getItem("userInfo"));
    },
    props: {},
    data() {
        return {
            config: config,
            coreValues: [],
            insertValues: [],
            value: "",
            countValue: 0,
            change: true,
            message: "",
        };
    },
    components: {
        NavbarLeftHome,
        Header,
    },
    watch: {},
    methods: {
        getListCoreValue() {
            Axios.get("coreValue/get").then((response) => {
                if (response.data.status == "success") {
                    this.coreValues = response.data.data;

                    this.erros = "";
                } else {
                    this.errors = response.data.message;
                }
                this.ajaxLock = false;
            });
        },

        getRandomColor() {
            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        insertR() {
            var value = "";
            window.scrollTo(0, document.body.scrollHeight);
            this.insertValues.push(value);
        },
        saveCoreValue() {
            Axios.post("coreValue/create", {
                CoreValue: this.value,
            })
                .then((res) => {
                    if (res.data.status == "success") {
                        console.log(res.data.data);
                        alert(res.data.message);
                        this.insertValues = [];
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
            this.getListCoreValue();
        },

        updateCoreValue() {
            this.coreValues.forEach((item) => {
                Axios.post("coreValue/update", {
                    coreValue: item.CoreValue,
                    id: item.id,
                })
                    .then((res) => {
                        if (res.data.status == "success") {
                            console.log(res.data.data);
                            this.message = res.data.message;
                        }
                    })
                    .catch(() => {
                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    });
            });
            alert(this.message);
            this.change = true;
            this.getListCoreValue();
        },
        deleteCoreValue(id) {
            Axios.post("coreValue/delete", {
                id: id,
                CoreValue: this.value,
            })
                .then((res) => {
                    if (res.data.status == "success") {
                        console.log(res.data.data);
                        alert(res.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
            this.getListCoreValue();
        },
    },
};
</script>
<style scoped lang="scss">
.top {
    display: flex;
    margin-bottom: 20px;
}

.item-core {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 700;
}
.list {
    text-align: initial;
    padding: 10px;
}

.list-user {
    width: 40%;
    margin: -18px auto 0 auto;
}
</style>
