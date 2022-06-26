<template lang="">
    <div>Test friend</div>
    <div>danh sach</div>
    <!-- <li v-for="friend in friends" :key="friend.id"> -->
    {{ friends }}
    <!-- </li> -->
</template>
<script>
import Axios from "../Axios";

export default {
    name: "Test",
    create() {
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
            friends: [],
            errors: "",
            page: 1,
            ajaxLock: false,
            stillUser: true,
        };
    },
    watch: {},
    methods: {
        //     getlistFriend() {
        //         console.log("goi ham list friend");
        //         if (this.ajaxLock) return;
        //         this.ajaxLock = true;
        //         Axios.get("relationship/list_friend")
        //             .then((response) => {
        //                 console.log("response", response);
        //                 console.log("response.data", response.data);
        //                 console.log("response.data.data", response.data.data);
        //                 if (response.data.status == "success") {
        //                     response.data.data.forEach((x) => {
        //                         this.friends.push(x);
        //                     });
        //                 }
        //             })
        //             .catch(() => {
        //                 this.ajaxLock = false;
        //                 alert("Đã có lỗi xảy ra, vui lòng thử lại");
        //             });
        //     },
        getListFriend() {
            if (this.ajaxLock) return;
            this.ajaxLock = true;
            Axios.get("relationship/list_friend?page=" + this.page)
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
