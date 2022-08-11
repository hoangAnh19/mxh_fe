<template>
    <div class="group-top">
        <div class="row cover">
            <b-col class="p-0" cols="12">
                <lightgallery
                    :settings="{ speed: 500, plugins: plugins }"
                    v-if="group.cover"
                >
                    <a
                        class="gallery-item"
                        :href="
                            'http://127.0.0.1:8000/file_upload/' + group.cover
                        "
                        data-lg-size="1406-1390"
                    >
                        <img
                            v-if="group.cover"
                            class="cover"
                            :src="
                                'http://127.0.0.1:8000/file_upload/' +
                                group.cover
                            "
                        />
                    </a>
                </lightgallery>
            </b-col>
        </div>
        <div class="row content mt-5 pt-4">
            <b-col cols="12">
                <div class="group-name h3 fw-bold">
                    {{ group.name }}
                </div>
                <div class="statistic d-flex">
                    <div
                        class="type-group"
                        v-if="group.type == config.group.type.public"
                    >
                        <b-icon icon="globe"></b-icon> phòng/ban công khai
                    </div>
                    <div v-else class="type-group">
                        <b-icon icon="lock"></b-icon> phòng/ban riêng tư
                    </div>
                    <div class="mx-4">{{ count.person }} thành viên</div>
                    <div>{{ count.post }} bài viết</div>
                </div>
                <button
                    v-if="!member.role && !member.status"
                    class="btn btn-outline-success mt-4"
                    style="float: left"
                    v-on:click="answerGroup()"
                >
                    Tham gia phòng/ban
                </button>
                <button
                    v-if="member.status == config.member.status.pending"
                    class="btn btn-outline-secondary mt-4"
                    style="float: left"
                    v-on:click="outGroup()"
                >
                    Hủy yêu cầu
                </button>
                <button
                    v-if="member.status == config.member.status.member"
                    class="btn btn-outline-danger mt-4"
                    style="float: left"
                    v-on:click="confirmOutGroup()"
                >
                    Rời khỏi phòng/ban
                </button>
            </b-col>
        </div>
        <div class="row navbars">
            <b-col cols="6">
                <b-row>
                    <b-col
                        cols="3"
                        class="cursor-pointer nav-bar-top time-line p-3 fw-bold"
                        v-on:click="changeComponent(1)"
                        >Thảo luận</b-col
                    >
                    <b-col
                        cols="3"
                        class="cursor-pointer nav-bar-top introduce p-3 fw-bold"
                        v-on:click="changeComponent(2)"
                        >Giới thiệu</b-col
                    >
                    <b-col
                        cols="3"
                        class="cursor-pointer nav-bar-top introduce p-3 fw-bold"
                        v-on:click="changeComponent(3)"
                        v-if="
                            group.type == config.group.type.public ||
                            member.status == config.member.status.member
                        "
                        >Thành viên</b-col
                    >
                    <b-col
                        cols="2"
                        class="cursor-pointer nav-bar-top introduce p-3 fw-bold"
                        v-on:click="changeComponent(4)"
                        v-if="
                            group.type == config.group.type.public ||
                            member.status == config.member.status.member
                        "
                        >Ảnh</b-col
                    >
                </b-row>
            </b-col>
            <div v-if="modalAnswer">
                <div class="modal-answer"></div>
                <div class="modal-dialog-answer">
                    <div
                        class="modal-content-answer"
                        v-click-outside="closeModalAnswer"
                    >
                        <div class="header-modal-answer">
                            <span style="float: left" class="h4 fw-bold mx-2"
                                >Trả lời câu hỏi</span
                            ><b-icon
                                icon="x-circle"
                                v-on:click="closeModalAnswer"
                                style="float: right"
                            ></b-icon>
                        </div>
                        <br />
                        <br />
                        <div class="content-modal-answer">
                            <p style="text-align: left">
                                Hãy trả lời những câu hỏi sau của quản trị viên
                                để họ có thể xem xét yêu cầu tham gia của bạn.
                                Câu trả lời chỉ hiển thị với quản trị viên và
                                người kiểm duyệt
                            </p>
                            <div
                                class="question pb-4"
                                v-for="(question, index) in questions"
                                :key="index"
                            >
                                <span class="fw-bold"
                                    >Câu số {{ index + 1 }}:&nbsp;&nbsp;</span
                                >
                                <span>{{ question }}</span>
                                <div class="form-group px-2">
                                    <textarea
                                        class="form-control"
                                        placeholder="Viết câu trả lời ở đây"
                                        v-model="answers[index - 1]"
                                    ></textarea>
                                </div>
                            </div>
                            <div style="text-align: right" class="px-2">
                                <div
                                    class="btn btn-success"
                                    v-on:click="participationGroup"
                                >
                                    Gửi
                                </div>
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
import Axios from "@/components/Axios.js";
import config from "@/config";
import EventBus from "@/EventBus.js";
import Lightgallery from "lightgallery/vue";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
export default {
    name: "GroupTop",
    components: { Lightgallery },

    props: {
        count: Object,
        group_: Object,
        member_: Object,
    },
    created() {},
    mounted() {},

    data() {
        return {
            config: config,
            component: 1,
            modalAnswer: false,
            answers: [],
            questions: JSON.parse(this.group_.question),
            group: this.group_,
            member: this.member_,
            plugins: [lgZoom, lgVideo],
        };
    },
    watch: {},

    methods: {
        changeComponent(index) {
            EventBus.$emit("changeComponentGroup", index);
        },
        answerGroup() {
            if (this.group.type == this.config.group.type.private) {
                this.modalAnswer = true;
                this.member.status = config.member.status.pending;
            } else {
                this.participationGroup();
                this.member.status = config.member.status.member;
            }
        },
        outGroup() {
            this.member.status = null;

            Axios.post("group/out-group", { id: this.group.id })
                .then((response) => {
                    if (response.data.status === "success") {
                        EventBus.$emit("infoMember", {});
                    } else {
                        alert(response.data.message);
                    }
                    this.ajaxLock = false;
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau1");
                    this.ajaxLock = false;
                });
        },
        confirmOutGroup() {
            var a = confirm("Bạn có chắc là sẽ rời phòng/ban");
            if (a) {
                this.outGroup();
            }
        },
        closeModalAnswer() {
            this.modalAnswer = false;
        },
        participationGroup() {
            this.modalAnswer = false;
            this.answers = {};
            var ob = {
                id: this.group.id,
            };
            var quesAndAnswer = [];
            if (this.group.type == this.config.group.type.private) {
                this.questions.forEach((ques, index) => {
                    quesAndAnswer.push({
                        question: ques,
                        answer: this.answers[index],
                    });
                });
                ob.answer = JSON.stringify(quesAndAnswer);
            }
            Axios.post("group/participation", ob)
                .then((response) => {
                    if (response.data.status === "success") {
                        EventBus.$emit("infoMember", response.data.data);
                    } else {
                        console.log(response.data.message);
                    }
                    this.ajaxLock = false;
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sa4u");
                    this.ajaxLock = false;
                });
        },
    },
};
</script>
<style scoped lang="scss">
.group-name {
    text-align: left;
}
.group-top {
    background: white;
    padding: 0;
}

.cover {
    width: 100%;
    height: 300px;
    margin: 0;
}
.content {
    padding: 20px;
    text-align: center;
}
.modal-answer {
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
.modal-dialog-answer {
    margin: auto;
    z-index: 51;
    position: fixed;
    width: 30%;
    top: 15%;
    right: 0;
    bottom: 0;
    left: 0;
}
.modal-content-answer {
    position: relative;
    width: 100%;
    padding: 10px;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
}
.content-modal-answer {
    border-top: 1px solid #f2f2f2;
    padding-top: 10px;
}
.question {
    text-align: left;
}
</style>
