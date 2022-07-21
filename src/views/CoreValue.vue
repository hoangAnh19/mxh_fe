<template>
    <div class="list-friend" id="list-friend">
        <Header v-bind:user="user" />

        <NavbarLeftHome v-bind:user="user" />
        <div style="margin-top: 100px">
            <h2 style="font-weight: 700">Giá trị cốt lõi doanh nghiệp</h2>
            <div v-for="item in coreValues" :key="item">
                <div
                    class="item-core"
                    v-bind:style="{ background: getRandomColor() }"
                >
                    {{ item.CoreValue }}
                </div>
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
        };
    },
    components: {
        NavbarLeftHome,
        Header,
    },
    watch: {},
    methods: {
        getListCoreValue() {
            if (this.ajaxLock) return;
            this.ajaxLock = true;
            Axios.get("admin/coreValue").then((response) => {
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
    },
};
</script>
<style scoped lang="scss">
.top {
    display: flex;
    margin-bottom: 20px;
}

.item-core {
    height: 115px;
    padding: 50px;
    background: burlywood;
    border: 1px darkorchid;
    border-radius: 70%;
    margin-top: 31px;
    font-size: 25px;
    font-weight: 700;
}
.list {
    text-align: initial;
    padding: 10px;
}

.list-friend {
    width: 40%;
    margin: -18px auto 0 auto;
}
</style>
