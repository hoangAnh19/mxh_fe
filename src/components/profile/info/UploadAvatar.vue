<template>
    <div class="form-post">
        <b-row>
            <b-col class="item btn-post" cols="10" v-on:click="modal = !modal">
                <!-- <span>Thay đổi ảnh đại diện {{ this.typeImage }}</span> -->
                <span v-if="this.typeImage === 1">Thay đổi ảnh đại diện</span>
                <span v-if="this.typeImage === 2">Thay đổi ảnh bìa</span>
            </b-col>
        </b-row>
    </div>

    <div v-if="modal">
        <div class="modal1"></div>
        <div class="modal-dialog1">
            <div class="modal-content1">
                <div class="header-form-post">
                    <b-row>
                        <b-col class="avatar" cols="1">
                            <img
                                v-if="owner.avatar"
                                :src="
                                    'http://127.0.0.1:8000/file_upload/' +
                                    owner.avatar
                                "
                            />
                            <img
                                v-else
                                src="@/assets/image/default-user-avatar.png"
                            />
                        </b-col>
                        <b-col
                            class="position-relative"
                            cols="4"
                            style="margin-left: 15px"
                        >
                            <span style="float: left; font-weight: 600">{{
                                fullname
                            }}</span>
                            <br />
                        </b-col>
                        <b-col>
                            <b-icon
                                icon="x-circle"
                                v-on:click="closeModal"
                                style="float: right"
                            ></b-icon>
                        </b-col>
                    </b-row>
                </div>
                <div class="content-form-post">
                    <textarea
                        v-model="dataPost"
                        class="content"
                        placeholder="Bạn đang nghĩ gì"
                        rows="10"
                        cols="50"
                        style="width: -webkit-fill-available"
                    ></textarea>
                    <div v-if="images.length">
                        <img
                            class="image"
                            v-for="image in images"
                            :key="image"
                            :src="'http://127.0.0.1:8000/file_upload/' + image"
                        />
                    </div>
                </div>
                <div class="footer-form-post">
                    <button
                        class="btn btn-success"
                        v-on:click="selectButtonImage"
                        style="width: 100%"
                    >
                        Thêm ảnh
                    </button>
                    <button
                        class="btn btn-primary mt-1"
                        v-on:click="savePost"
                        style="width: 100%"
                    >
                        Đăng
                    </button>
                    <input
                        ref="inputImage"
                        hidden
                        type="file"
                        v-on:change="uploadImage($event)"
                    />
                    <button
                        class="btn btn-primary mt-1"
                        style="width: 100%"
                        v-on:click="closeModal"
                    >
                        Huỷ bỏ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import EventBus from "@/EventBus.js";

export default {
    name: "UploadAvatar",
    components: {},
    props: {
        user: {},
        group: {},
        showModal: Boolean,
        typeImage: Number,
    },
    created() {
        this.owner = JSON.parse(localStorage.getItem("userInfo"));
        console.log("modal", this.showModal);
        this.modal = this.showModal;
    },

    data() {
        return {
            owner: {},
            type_show: 1,
            hiddenTypeShow: true,
            images: [],
            dataPost: "",
            modal: this.showModal,
        };
    },
    methods: {
        closeModal() {
            this.modal = false;
            this.hiddenTypeShow = true;
        },

        async savePost() {
            var formData = new FormData();
            formData.append("images[]", this.images[0]);
            formData.append("data", this.dataPost);

            for (const pair of formData.entries()) {
                console.log(`${pair[0]}, ${pair[1]}`);
            }
            var object = {};
            if (this.typeImage === 1) object.avatar = this.images[0];
            else object.cover = this.images[0];
            console.log(object);
            await Axios.post("user/uploadAvatar", object)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.images = [];
                        this.modal = false;
                        Axios.post("post/create", formData)
                            .then((response) => {
                                console.log(formData);
                                for (const pair of formData.entries()) {
                                    console.log(`${pair[0]}, ${pair[1]}`);
                                }

                                if (response.data.status == "success") {
                                    this.images = [];
                                    this.dataPost = "";
                                    this.modal = false;
                                    if ((this.group ?? {}).type == 2)
                                        alert(
                                            "Bài viết đang chờ admin kiểm duyệt, vui lòng chờ"
                                        );
                                    else {
                                        EventBus.$emit(
                                            "createPost",
                                            response.data.data[0]
                                        );
                                    }
                                } else {
                                    alert(response.data.message);
                                }
                            })
                            .catch(() => {
                                alert(
                                    "Đã có lỗi xảy ra, vui lòng thử lại sau1"
                                );
                            });
                        this.$router.go();
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra khi đăng avatar");
                });
        },

        hideShow(type) {
            this.hiddenTypeShow = true;
            if ([1, 2, 3, 4, 5].includes(type)) {
                this.type_show = type;
            }
        },
        selectButtonImage() {
            this.$refs.inputImage.click();
        },

        uploadImage(event) {
            if (
                !(
                    event.target.files[0].type === "image/jpeg" ||
                    event.target.files[0].type === "image/png"
                )
            ) {
                alert("Ảnh không đúng định dạng");
                return;
            }
            var formData = new FormData();
            formData.append("image", event.target.files[0]);
            Axios.post("image/upload", formData)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.images.push(response.data.data);
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
    },
    computed: {
        fullname: function () {
            return this.owner.first_name + " " + this.owner.last_name;
        },
        typeShow: function () {
            switch (this.type_show) {
                case 2:
                    return "<span><b-icon icon='people'></b-icon>Bạn bè</span>";

                case 3:
                    return "<span><b-icon icon='lock'></b-icon>Chỉ mình tôi</span>";

                case 4:
                    return "<span><b-icon icon='person'></b-icon>Bạn bè cụ thể</span>";

                default:
                    return "<span><b-icon icon='person-dash'></b-icon>Bạn bè trừ</span>";
            }
        },
    },
};
</script>
<style scoped lang="scss">
.form-post {
    border-radius: 5px;
    background-color: white;
}
.avatar {
    padding-left: 20px !important;
    display: flex;
}
.avatar img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin: auto;
}
.item {
    padding: 10px;
}
.list-type-show {
    margin-top: 10px;
    background: white;
    width: 110%;
    list-style: none;
    border: 1px solid black;
}
.list-type-show li {
    border-bottom: 1px solid black;
    padding: 0 10px;
}
.list-type-show li:hover {
    background: rgb(139, 204, 139);
    color: white;
}
.btn-post {
    cursor: pointer;
    background-color: #ecf7e7;
    background-clip: content-box;
    color: #6fbe44 !important;
    display: flex;
    font-size: 20px;
    border-radius: 10px;
    font-weight: 700;
}
.btn-post span {
    margin: auto;
}
.icon-image {
    display: flex;
    padding-right: 20px;
}

.modal1 {
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    opacity: 0.6;
    opacity: 0.6;
    background: #000;
}
.modal-dialog1 {
    margin: auto;
    z-index: 51;
    position: fixed;
    width: 30%;
    top: 15%;
    right: 0;
    bottom: 0;
    left: 0;
}
.modal-content1 {
    position: relative;
    width: 100%;
    padding: 10px;
    // min-height: 500px;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
}
.type-show {
    // wid
    height: 30px;
    padding: 0;
    width: 85%;
    text-align: left;
    padding-left: 10px;
}
.content {
    border: 0;
    margin-top: 10px;
    border-top: 1px solid #f5f5ff;
}
.content:focus {
    outline: none;
}
.image {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    float: left;
}
</style>
