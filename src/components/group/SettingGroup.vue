<template>
    <div class="create-group">
        <div class="title">Thông tin phòng/ban</div>
        <div class="body">
            <b-row>
                <b-col cols="4">
                    <div class="form-group">
                        <label class="fw-bold"> Tên phòng/ban</label>
                        <input
                            class="form-control"
                            placeholder="Nhập tên phòng/ban"
                            v-model="nameGroup"
                        />
                        <span class="text-danger">{{
                            errors.nameGroup ?? null
                        }}</span>
                    </div>

                    <div class="form-group">
                        <label class="fw-bold"> Giới thiệu</label>
                        <input
                            class="form-control"
                            placeholder="Viết lời giới thiệu về phòng/ban"
                            v-model="intro"
                        />
                    </div>

                    <div class="form-group">
                        <label class="fw-bold"> Loại phòng/ban</label>
                        <br />
                        <div class="form-check d-inline-block p-0">
                            <input
                                type="radio"
                                value="1"
                                id="groupPublic"
                                v-model="typeGroup"
                            />
                            <label for="groupPublic"
                                >&nbsp;&nbsp;Công khai</label
                            >
                        </div>
                        <div class="form-check d-inline-block">
                            <input
                                type="radio"
                                value="2"
                                id="groupPrivate"
                                v-model="typeGroup"
                            />
                            <label for="groupPrivate"
                                >&nbsp;&nbsp;Riêng tư</label
                            >
                        </div>
                    </div>
                    <div class="form-group" v-if="typeGroup == 2">
                        <label class="fw-bold"> Câu hỏi kiểm duyệt </label
                        ><i class="text-primary">
                            ( Thêm câu hỏi trong quá trình duyệt thành viên )</i
                        >
                        <div
                            class="form-group"
                            v-for="ques in countQues"
                            :key="ques"
                        >
                            <label>Câu hỏi {{ ques }}: </label
                            ><button
                                class="btn btn-outline-danger mb-2"
                                style="float: right"
                                v-on:click="deleteQ(ques - 1)"
                            >
                                Xóa
                            </button>
                            <input
                                class="form-control"
                                v-model="question[ques - 1]"
                            />
                            <span class="text-danger">{{
                                errors.question[ques - 1] ?? null
                            }}</span>
                        </div>
                        <button class="btn" v-on:click="incQ()">
                            <b-icon icon="plus-circle-fill"></b-icon> Thêm câu
                            hỏi
                        </button>
                    </div>

                    <div class="form-group">
                        <label class="fw-bold"> Kiểm duyệt bài viết</label>
                        <br />
                        <div class="form-check d-inline-block p-0">
                            <input
                                type="radio"
                                value="1"
                                id="groupPublic"
                                v-model="browsePost"
                            />
                            <label for="groupPublic">&nbsp;&nbsp;Có</label>
                        </div>
                        <div class="form-check d-inline-block">
                            <input
                                type="radio"
                                value="0"
                                id="groupPrivate"
                                v-model="browsePost"
                            />
                            <label for="groupPrivate">&nbsp;&nbsp;Không</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="fw-bold"> Nội quy phòng/ban</label>
                        <textarea
                            v-model="regulations"
                            class="form-control"
                            rows="10"
                        ></textarea>
                    </div>
                </b-col>
                <b-col>
                    <div class="form-group">
                        <label class="fw-bold"> Chọn ảnh bìa</label>
                        <br />
                        <button
                            class="btn btn-outline-success"
                            v-on:click="selectButtonImage"
                        >
                            Tải ảnh bìa lên
                        </button>
                        <input
                            ref="inputImage"
                            hidden
                            type="file"
                            v-on:change="uploadImage($event)"
                        />
                        <br />
                        <img
                            v-if="cover"
                            class="image"
                            :src="'http://127.0.0.1:8000/tmp_images/' + cover"
                        />
                    </div>
                </b-col>
            </b-row>
            <button class="btn btn-success" v-on:click="updateGroup">
                Sửa
            </button>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import EventBus from "@/EventBus.js";
import Axios from "@/components/Axios.js";
import validate from "@/validate";
import EventBus from "@/EventBus.js";

export default {
    name: "CreateGroup",
    created() {
        // window.onbeforeunload = function(){
        //        if (validate.required)
        // }
    },
    props: {
        group: null,
    },
    data() {
        return {
            typeGroup: this.group.type,
            countQues: JSON.parse(this.group.question).length,
            question: JSON.parse(this.group.question),
            browsePost: this.group.browse_post,
            cover: this.group.cover,
            regulations: this.group.regulations,
            nameGroup: this.group.name,
            intro: this.group.intro,
            ajaxLock: false,
            isErrors: false,
            errors: {
                question: [],
            },
        };
    },
    watch: {},
    methods: {
        updateGroup() {
            if (!confirm("Bạn có muốn sửa thông tin phòng/ban?")) return;
            if (this.ajaxLock) return;
            this.errors = {
                question: [],
            };
            this.isErrors = false;
            if (!validate.required(this.nameGroup)) {
                this.errors.nameGroup = "Vui lòng nhập tên phòng/ban";
                this.isErrors = true;
            }
            if (this.typeGroup == 2 && this.countQues) {
                console.log(this.question);
                this.question.forEach((ques, index) => {
                    if (!ques) {
                        this.errors.question[index] = "Vui lòng nhập câu hỏi";
                        this.isErrors = true;
                    }
                });
            }
            if (this.isErrors) return;
            Axios.post("group/update", {
                name: this.nameGroup,
                browse_post: this.browsePost,
                type: this.typeGroup,
                regulations: this.regulations,
                intro: this.intro,
                question: JSON.stringify(this.question),
                cover: this.cover,
                id: this.$route.params.groupId,
            })
                .then((response) => {
                    if (response.data.status === "success") {
                        EventBus.$emit("updateGroup", response.data.data);
                    } else {
                        console.log(response.data.message);
                    }
                    this.ajaxLock = false;
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    this.ajaxLock = false;
                });
        },
        incQ() {
            this.question[this.countQues] = "";
            this.countQues++;
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
                        this.cover = response.data.data;
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },
        deleteQ(index) {
            this.question.splice(index, 1);
            this.countQues--;
        },
        selectButtonImage() {
            this.$refs.inputImage.click();
        },
    },
};
</script>
<style scoped lang="scss">
.create-group {
    background: white;
    padding: 10px 20px;
    border-radius: 10px;
    margin-top: 20px;
    text-align: left;
}
.title {
    font-size: 35px;
    text-align: left;
    font-weight: 600;
}
.body {
    border-top: 1px solid #f2f2f2;
    padding: 10px;
}
.form-group {
    padding: 10px 0;
}
.image {
    margin-top: 10px;
    width: 100%;
    object-fit: contain;
    max-height: 50%;
    margin-bottom: 10px;
}
</style>
