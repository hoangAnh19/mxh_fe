<template lang="">
    <div>Test friend</div>
    <div>danh sach</div>
    <!-- <li v-for="friend in friends" :key="friend.id"> -->
    <!-- </li> -->
    <textarea class="form-control" v-model="count"></textarea>
    <br />
    {{ count }}
</template>
<script>
import Axios from "../Axios";

export default {
    name: "Test",
    created() {
        // this.getlistUser();
        window.onscroll = () => {
            if (
                window.scrollY + window.innerHeight >=
                    document.body.scrollHeight + 80 &&
                !this.ajaxLock &&
                this.stillUser
            ) {
                this.getlistUser();
            }
        };
    },
    props: {},

    data() {
        return {
            friends: [],
            errors: "",
            page: 1,
            ajaxLock: false,
            stillUser: true,
            count: 0,
        };
    },
    watch: {
        count: function () {
            console.log("thay doi gia", this.count);
        },
    },
    mounted() {
        setInterval(() => {
            console.log("mouted");
            this.count++;
        }, 3000);
        console.log("mouted");
    },
    methods: {
        getCount() {
            setInterval(function () {
                this.count++;
            }, 3000);
            console.log("dang goi ham");
        },

        getlistUser() {
            if (this.ajaxLock) return;
            this.ajaxLock = true;
            Axios.get("user/list_user?page=" + this.page)
                .then((response) => {
                    console.log("response", response);
                    console.log("response.data", response.data);
                    console.log("response.data.data", response.data.data);

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
<style lang=""></style>
