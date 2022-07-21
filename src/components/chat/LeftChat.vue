<template>
    <div class="left-chat" id="left-chat">
        <div class="top-left-chat d-flex">
            <div class="avatar">
                <img
                    v-if="user.avatar"
                    :src="'http://127.0.0.1:8000/tmp_images/' + user.avatar"
                />
                <img v-else src="@/assets/image/default-user-avatar.png" />
            </div>
            <div class="fw-bold" style="flex: 1; margin: auto 10px">
                {{ user.first_name + " " + user.last_name }}
            </div>
            <div
                class="create-new-mess"
                v-on:click="modalNewMessage = true"
                style="margin: auto 10px"
            >
                <img src="@/assets/icon/icon-create-new-message.svg" />
            </div>
        </div>
        <div class="main-left-chat">
            <input placeholder="Tìm kiếm" class="form-input" />
            <div
                v-for="item in listChat"
                :key="item"
                class="d-flex item-chat"
                v-on:click="selectNewMessage(item)"
            >
                <div class="avatar">
                    <img
                        v-if="item.avatar"
                        :src="'http://127.0.0.1:8000/tmp_images/' + item.avatar"
                    />
                    <img v-else src="@/assets/image/default-user-avatar.png" />
                </div>
                <div style="flex: 1; margin: auto 10px">
                    <div class="fw-bold">
                        {{ item.first_name + " " + item.last_name }}
                    </div>
                    <div class="d-flex justify-content-between form-content">
                        <div
                            class="last_message"
                            v-html="lastMessage(item)"
                        ></div>
                        <div class="last_time">
                            {{
                                convertTime(
                                    (item.last_message ?? {}).created_at
                                )
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalNewMessage">
        <div class="modal-new-message"></div>
        <div class="modal-dialog-new-message">
            <div
                class="modal-content-new-message"
                v-click-outside="closeModalNewMessage"
            >
                <div class="header-modal-new-message">
                    <span style="float: left" class="h4 fw-bold mx-2"
                        >Tạo cuộc trò chuyện mới</span
                    ><b-icon
                        icon="x-circle"
                        v-on:click="closeModalNewMessage"
                        style="float: right"
                    ></b-icon>
                </div>
                <br />
                <br />
                <div class="content-modal-new-message">
                    <div class="form-group d-flex">
                        <label style="margin: auto">Đến:&nbsp;</label>
                        <input
                            v-model="key_search"
                            v-on:keyup="search(key_search)"
                            class="form-input"
                            placeholder="Nhập bạn bè"
                        />
                    </div>
                    <div class="list-search">
                        <div
                            v-for="item in listSearch"
                            :key="item"
                            class="d-flex item-search"
                            v-on:click="selectNewMessage(item)"
                        >
                            <div class="avatar">
                                <img
                                    v-if="item.avatar"
                                    :src="
                                        'http://127.0.0.1:8000/tmp_images/' +
                                        item.avatar
                                    "
                                />
                                <img
                                    v-else
                                    src="@/assets/image/default-user-avatar.png"
                                />
                            </div>
                            <div
                                class="fw-bold"
                                style="flex: 1; margin: auto 10px"
                            >
                                {{ item.first_name + " " + item.last_name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";

export default {
    name: "LeftChat",
    created() {},
    mounted() {
        var left = document.getElementById("left-chat");
        left.onscroll = () => {
            if (
                left.scrollTop + left.offsetHeight >= left.scrollHeight &&
                this.ajaxListMessage == false
            ) {
                EventBus.$emit("loadChat");
            }
        };
    },
    props: {
        listChat: Array,
        user: Object,
        ajaxListMessage: Boolean,
    },
    data() {
        return {
            modalNewMessage: false,
            key_search: "",
            ajaxLock: false,
            listSearch: [],
        };
    },
    watch: {},
    computed: {},
    methods: {
        convertTime(param) {
            if (param) {
                var date = new Date(param);
                return (
                    (date.getHours() < 10
                        ? "0" + date.getHours()
                        : date.getHours()) +
                    ":" +
                    (date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes()) +
                    " " +
                    date.getDate() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    (1900 + date.getYear())
                );
            } else return;
        },
        closeModalNewMessage() {
            this.modalNewMessage = false;
            this.key_search = "";
            this.listSearch = [];
        },
        lastMessage: function (user) {
            if (user.last_message) {
                if (user.is_one == user.last_message.isOne)
                    return "Bạn:&nbsp" + user.last_message.data;
                else return user.last_name + ":" + user.last_message.data;
            }
        },
        selectNewMessage(item) {
            if (this.user.level + 1 < item.level) {
                alert("Bạn không có quyền chủ động liên hệ người này");
            } else {
                EventBus.$emit("selectMessage", item);
                this.closeModalNewMessage();
            }
        },

        search(data) {
            if (this.ajaxLock) return;
            this.ajaxLock = true;
            Axios.get("user/searchUser?user_name=" + data)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.listSearch = response.data.data;
                    } else {
                        console.log(this.data.message);
                    }
                    this.ajaxLock = false;
                })
                .catch(() => {
                    this.ajaxLock = false;
                });
        },
    },
};
</script>
<style scoped lang="scss">
.left-chat {
    text-align: left;
    padding: 8px 0;
    border-right: 1px solid #f2f2f2;
    background: white;
    overflow: auto;
    height: calc(100vh - 80px);
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
.left-chat:hover::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.left-chat::-webkit-scrollbar {
    width: 5px !important;
    background: white;
}
.left-chat:hover::-webkit-scrollbar-thumb {
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
.modal-new-message {
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    opacity: 0.6;
    background: #000;
}
.modal-dialog-new-message {
    margin: auto;
    z-index: 51;
    position: fixed;
    width: 30%;
    top: 15%;
    right: 0;
    bottom: 0;
    left: 0;
}
.modal-content-new-message {
    position: relative;
    text-align: left;
    width: 100%;
    padding: 10px;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
}
.content-modal-new-message {
    border-top: 1px solid #f2f2f2;
    padding-top: 10px;
}
.form-input {
    display: block;
    width: 100%;
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
input:focus {
    outline: none;
}
.item-search {
    padding: 10px;
    border-bottom: 1px solid #f2f2f2;
}
.top-left-chat {
    padding-bottom: 8px;
    padding-left: 10px;
    border-bottom: 1px solid #f2f2f2;
}
.item-chat {
    padding: 10px;
    border-bottom: 1px solid #f2f2f2;
}
.main-left-chat {
    padding: 20px 0;
}
.last_message {
    overflow: hidden;
    position: absolute;
    width: calc(100% - 120px);
    text-overflow: ellipsis; //thêm 3 dấu chấm ở cuối
    white-space: nowrap;
}
.last_time {
    overflow: hidden;
    position: absolute;
    right: 0;
}

.form-content {
    position: relative;
    height: 24px;
}
</style>
