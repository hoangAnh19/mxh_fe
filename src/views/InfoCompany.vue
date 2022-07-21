<template>
    <div class="list-friend" id="list-friend">
        <Header v-bind:user="user" />

        <NavbarLeftHome v-bind:user="user" />
        <div style="margin-top: 100px">
            <h1>Tổng quan doanh nghiệp</h1>

            <div class="tn">
                <h1>TẦM NHÌN</h1>
                <span
                    >“Trở thành biểu tượng niềm tin hàng đầu Việt Nam về sản
                    phẩm dinh dưỡng và sức khỏe phục vụ cuộc sống con
                    người“</span
                >
            </div>
            <div class="sm">
                <h1>SỨ MỆNH</h1>
                <span
                    >“Vinamilk cam kết mang đến cho cộng đồng nguồn dinh dưỡng
                    và chất lượng cao cấp hàng đầu bằng chính sự trân trọng,
                    tình yêu và trách nhiệm cao của mình với cuộc sống con người
                    và xã hội”</span
                >
            </div>

            <div class="tl">
                <div class="content">
                    <h1>TRIẾT LÝ KINH DOANH</h1>
                    <span
                        >Vinamilk mong muốn trở thành sản phẩm được yêu thích ở
                        mọi khu vực, lãnh thổ. Vì thế chúng tôi tâm niệm rằng
                        chất lượng và sáng tạo là người bạn đồng hành của
                        Vinamilk. Vinamilk xem khách hàng là trung tâm và cam
                        kết đáp ứng mọi nhu cầu của khách hàng.
                    </span>

                    <h3 style="margin-top: 20px">Chính sách chất lượng</h3>
                    <span>
                        Luôn thỏa mãn và có trách nhiệm với khách hàng bằng cách
                        không ngừng cải tiến, đa dạng hóa sản phẩm và dịch vụ,
                        đảm bảo chất lượng, an toàn vệ sinh thực phẩm với giá cả
                        cạnh tranh, tôn trọng đạo đức kinh doanh và tuân theo
                        luật định.
                    </span>
                </div>

                <img
                    src="../assets/1397710322-e1eb7b6eb4c22487647ae1c668f42586ebf9f4ccf5b815ef8942e9fd681efe69.png"
                    alt=""
                />
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
    width: 45%;
    margin: -18px auto 0 auto;
}
.tn {
    text-align: start;
    width: 33%;
    margin-top: 40px;
}

.sm {
    text-align: end;
    width: 33%;
    margin-left: auto;
}
.tl {
    margin-top: 20px;

    display: flex;
}
.content {
    width: 50%;
}

img {
    width: 280px;
    height: 270px;
    margin-left: 15px;
    margin-top: 110px;
}

h1 {
    color: #2a3b88;
    font-family: Arial !important;
    font-weight: 700;
}
</style>
