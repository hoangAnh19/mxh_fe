<template>
    <div class="partner">
        <div class="top d-flex" v-if="chat.id">
            <div class="avatar">
                <img
                    v-if="chat.avatar"
                    :src="'http://127.0.0.1:8000/file_upload/' + chat.avatar"
                />
                <img v-else src="@/assets/image/default-user-avatar.png" />
            </div>
            <div class="fw-bold" style="flex: 1; margin: auto 10px">
                {{ chat.first_name + " " + chat.last_name }}
            </div>
        </div>
        <div class="main-chat" id="main-chat" v-if="chat.id">
            <div class="main">
                <div class="">
                    <div class="avatar">
                        <img
                            v-if="chat.avatar"
                            :src="
                                'http://127.0.0.1:8000/file_upload/' +
                                chat.avatar
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                        />
                    </div>
                    <div
                        class="fw-bold"
                        style="flex: 1; margin: 10px 0; text-align: center"
                    >
                        {{ chat.first_name + " " + chat.last_name }}
                    </div>
                </div>
                <div class="list-message">
                    <div v-for="messItem in chat.message" :key="messItem">
                        <div
                            class="right-mess"
                            v-if="chat.is_one == messItem.isOne"
                        >
                            <div class="right-mess-item">
                                <div
                                    v-if="
                                        this.arrayFileName.includes(
                                            messItem.data.slice(-3)
                                        ) ||
                                        this.arrayFileName.includes(
                                            messItem.data.slice(-4)
                                        )
                                    "
                                >
                                    <a
                                        :href="
                                            config.url.document + messItem.data
                                        "
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >{{ messItem.data }}</a
                                    >
                                </div>
                                <div v-else>{{ messItem.data }}</div>
                            </div>
                        </div>
                        <div class="left-mess" v-else>
                            <div class="left-mess-item">
                                <div
                                    v-if="
                                        this.arrayFileName.includes(
                                            messItem.data.slice(-3)
                                        ) ||
                                        this.arrayFileName.includes(
                                            messItem.data.slice(-4)
                                        )
                                    "
                                >
                                    <a
                                        :href="
                                            config.url.document + messItem.data
                                        "
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >{{ messItem.data }}</a
                                    >
                                </div>
                                <div v-else>{{ messItem.data }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="send-message d-flex">
                <input
                    v-model="message"
                    class="form-input"
                    @keydown.enter.exact.prevent="sendMess()"
                />
                <b-icon
                    icon="file-earmark-arrow-up"
                    style="margin: auto; font-size: 30px"
                    v-on:click="selectButtonImage"
                ></b-icon>
                <b-icon
                    v-on:click="sendMess()"
                    icon="cursor"
                    style="margin: auto; font-size: 30px; margin: 0 20px"
                ></b-icon>
                <input
                    ref="inputFile"
                    hidden
                    type="file"
                    v-on:change="uploadFile($event)"
                />
            </div>
        </div>
        <div v-else style="text-align: center; position: relative; top: 40%">
            Chọn tài khoản để bắt đầu cuộc trò chuyện
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";
import config from "@/config";

export default {
    name: "MainChat",
    updated() {
        if (this.isBottom) {
            var element = document.getElementById("main-chat");
            element.scrollTop = element.scrollHeight;
            this.isBottom = false;
        } else {
            this.isBottom = true;
            if (this.x < 0) {
                this.x++;
            } else if (this.x == 2) {
                var elemet = document.getElementById("main-chat");
                alert(element.scrollHeight);
                elemet.scrollTop = elemet.scrollHeight;
                this.x == 3;
            }
        }
    },
    created() {
        window.onscroll = () => {
            console.log(
                window.scrollY,
                window.innerHeight,
                document.body.scrollHeight,
                !this.ajaxLock,
                this.stillPost
            );
            if (
                window.scrollY + window.innerHeight >=
                document.body.scrollHeight
            ) {
                this.getMessage(this.chat.id, this.page++);
            }
        };
    },
    props: {
        chat: Object,
        user: Object,
    },
    mounted() {},
    data() {
        return {
            page: 1,
            config: config,
            message: "",
            x: 0,
            isBottom: false,
            ajaxLock: false,
            file: "",
            arrayFileName: [
                "pdf",
                "docx",
                "png",
                "jpg",
                "jpeg",
                "mp3",
                "mp4",
                "jfif",
            ],
        };
    },
    watch: {
        "chat.id": function () {
            if (!this.chat.isLoad) {
                this.getMessage(this.chat.id, 1);
            }
        },
        "chat.last_message": function () {},
    },
    methods: {
        getMessage(id, page) {
            Axios.get("chat/getMessage?id=" + id + "&page=" + page)
                .then((res) => {
                    if (res.data.status == "success") {
                        EventBus.$emit("loadMessage", res.data.data, id);
                        console.log(
                            "function getMess",
                            res.data.data,
                            "chat mess",
                            this.chat.message
                        );
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        async sendMess() {
            if (this.ajaxLock) return;
            if (!this.message) return;
            this.ajaxLock = true;
            await Axios.post("chat/send", {
                receiver_id: this.chat.id,
                data: this.message,
            })
                .then((res) => {
                    this.message = "";
                    this.ajaxLock = false;
                    EventBus.$emit("message_", res.data);
                    console.log("function sendMess", res.data);
                    window.scrollTo({ bottom: 0, behavior: "smooth" });
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    this.ajaxLock = false;
                });
            this.isBottom = true;
        },

        selectButtonImage() {
            this.$refs.inputFile.click();
        },
        uploadFile(event) {
            var formData = new FormData();
            formData.append("file", event.target.files[0]);
            Axios.post("file/upload", formData)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.file = response.data.data;
                        console.log(this.file);
                        this.message = response.data.data;
                        alert("Đã tải file lên thành công");
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
    },
};
</script>
<style scoped lang="scss">
.partner {
    background: white;
    height: calc(100vh - 80px);
}
.main-chat {
    text-align: left;
    background: white;
    overflow: auto;
    height: calc(100vh - 200px);
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
.main-chat:hover::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.main-chat::-webkit-scrollbar {
    width: 5px !important;
    background: white;
}
.main-chat:hover::-webkit-scrollbar-thumb {
    background: #646668;
    height: 100px;
    border-radius: 5px;
}
.avatar {
    display: flex;
}
.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: auto;
}
.top {
    padding: 8px 10px;
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
}
.main {
    padding: 40px 10px 10px 10px;
}
.send-message {
    position: fixed;
    bottom: 15px;
    left: 25%;
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
.main-chat {
    margin-bottom: 55px;
}
.right-mess {
    text-align: right;
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
.list-message {
    display: flex;
    flex-direction: column-reverse;
}
</style>
