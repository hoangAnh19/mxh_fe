<template>
    <div class="form-chat">
        <div class="header d-flex">
            <div class="avatar">
                <img
                    v-if="user.avatar"
                    :src="'http://127.0.0.1:8000/tmp_images/' + user.avatar"
                />
                <img v-else src="@/assets/image/default-user-avatar.png" />
            </div>
            <span class="m-2">{{
                `${user.first_name} ${user.last_name}`
            }}</span>
            <button
                type="button"
                class="close"
                aria-label="Close"
                style="
                    margin-left: auto;
                    border-radius: 20px;
                    border: 2px solid white;
                "
                v-on:click="closeDialog"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="body-chat" id="body-chat" ref="bodyChat">
            <div class="list-message">
                <div v-for="messItem in user.message" :key="messItem">
                    <div
                        class="right-mess"
                        v-if="user.is_one == messItem.isOne"
                    >
                        <div class="right-mess-item">
                            <div>{{ messItem.data }}</div>
                        </div>
                    </div>
                    <div v-else class="left-mess">
                        <div class="left-mess-item">
                            <div>{{ messItem.data }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="send-message d-flex">
            <input v-model="message" class="form-input" />
            <b-icon
                v-on:click="sendMess"
                icon="cursor"
                style="margin: auto; font-size: 30px; margin: 0 20px"
            ></b-icon>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";

export default {
    name: "FormChat",
    mounted() {
        this.scrollToElement();
        console.log("prop user", this.user);
        if (this.user.message) this.userMess.message = this.user.message;
        console.log("prop userMess.message", this.userMess.message);
    },
    props: {
        user: Object,
    },
    created() {
        /**
         * TODO
         */
        // if (this.user.message.length) {
        //     for (let i = 0; i < this.user.message.length; i++) {
        //         this.userMess.push(this.user.message);
        //     }
        // }
    },

    data() {
        return {
            message: "",
            ajaxLock: false,
            userMess: { message: [] },
        };
    },
    watch: {},
    methods: {
        closeDialog() {
            EventBus.$emit("closeUserDialog");
        },

        scrollToElement() {
            const el = this.$refs.bodyChat;

            if (el) {
                // Use el.scrollIntoView() to instantly scroll to the element
                el.scrollIntoView({ behavior: "smooth" });
            }
        },

        revertObj(obj) {
            let newObj = Object.keys(obj)
                .sort()
                .reverse()
                .map((key) => ({ ...obj[key], key: key }));
            return newObj;
        },

        async sendMess() {
            if (this.ajaxLock) return;
            if (!this.message) return;
            this.ajaxLock = true;
            await Axios.post("chat/send", {
                receiver_id: this.user.id,
                data: this.message,
            }).then((res) => {
                console.log(res);
                this.message = "";
                this.ajaxLock = false;
                EventBus.$emit("sendMessageHome", res.data, this.user.id);
            });
            // .catch(() => {
            //     alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
            //     this.ajaxLock = false;
            // });

            this.isBottom = true;
        },
    },
};
</script>
<style scoped lang="scss">
.form-chat {
    position: relative;
    height: 450px;
    width: 350px;
}
.header {
    background-color: white;
    padding: 0 10px;
    border-radius: 10px 10px 0 0;
    border-bottom: solid;
}
.avatar {
    display: flex;
    position: relative;
}
.body-chat {
    position: relative;
    top: 0;
    height: calc(100% - 90px);
}
.send-message {
    background-color: white;
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
}
.form-input {
    display: block;
    flex: 1;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 20px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.avatar img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin: auto;
}
.left-mess {
    text-align: left;
}
.right-mess-item,
.left-mess-item {
    display: inline-block;
    background-color: #f2f2f2;
    padding: 5px;
    border-radius: 5px;
    margin: 5px 0;
    max-width: 40%;
    word-wrap: break-word;
}
.right-mess {
    text-align: right;
}
.body-chat {
    text-align: left;
    background: white;
    overflow: auto;

    padding: 10px;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
.body-chat:hover::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.body-chat::-webkit-scrollbar {
    width: 5px !important;
    background: white;
}
.body-chat:hover::-webkit-scrollbar-thumb {
    background: #646668;
    height: 100px;
    border-radius: 5px;
}
</style>
