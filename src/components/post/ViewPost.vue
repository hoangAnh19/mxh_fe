<template>
    <div class="form-post" v-if="post.id">
        <div class="d-flex">
            <div class="avatar">
                <img
                    v-if="post.user.avatar"
                    :src="
                        'http://127.0.0.1:8000/tmp_images/' + post.user.avatar
                    "
                />
                <img v-else src="@/assets/image/default-user-avatar.png" />
            </div>
            <div class="position-relative info-right">
                <router-link
                    :to="{ name: 'Profile', params: { userId: post.user.id } }"
                    class="full-name"
                    >{{ fullname(post.user) }}</router-link
                >
                <router-link
                    v-if="(post.user_2 ?? {}).id"
                    :to="{
                        name: 'Profile',
                        params: { userId: post.user_2.id },
                    }"
                    class="full-name"
                    ><b-icon icon="caret-right-fill"></b-icon
                    >{{ fullname(post.user_2) }}</router-link
                >
                <br />
                <br />
                <span
                    v-on:click="hiddenTypeShow = false"
                    style="font-size: 12px"
                >
                    <router-link
                        class="link"
                        :to="{ name: 'Post', params: { postId: post.id } }"
                    >
                        {{ convertTime(post.created_at) }}
                    </router-link>
                    <span v-if="post.type_show == 1"
                        ><b-icon icon="dot"></b-icon
                        ><b-icon icon="globe"></b-icon
                    ></span>
                    <span v-if="post.type_show == 2"
                        ><b-icon icon="dot"></b-icon
                        ><b-icon icon="people"></b-icon
                    ></span>
                    <span v-if="post.type_show == 3"
                        ><b-icon icon="dot"></b-icon
                        ><b-icon icon="lock"></b-icon
                    ></span>
                    <span v-if="post.type_show == 4"
                        ><b-icon icon="dot"></b-icon
                        ><b-icon icon="person"></b-icon
                    ></span>
                    <span v-if="post.type_show == 5"
                        ><b-icon icon="dot"></b-icon
                        ><b-icon icon="person-dash"></b-icon
                    ></span>
                </span>
            </div>
            <div>
                <b-icon
                    v-if="
                        !this.post.user_id_2 ||
                        post.user.user_id_2 == this.owner.id
                    "
                    icon="three-dots"
                    v-on:click="closeModal"
                    style="cursor: pointer"
                ></b-icon>
            </div>
        </div>
        <div class="main">
            <div class="content">
                {{ post.data }}
            </div>
            <div class="post_share" v-if="(post.post_share ?? {}).id">
                <div class="share-content-post">
                    <div class="d-flex">
                        <div class="avatar">
                            <img
                                v-if="post.post_share.user.avatar"
                                :src="
                                    'http://127.0.0.1:8000/tmp_images/' +
                                    post.post_share.user.avatar
                                "
                            />
                            <img
                                v-else
                                src="@/assets/image/default-user-avatar.png"
                            />
                        </div>
                        <div class="position-relative info-right">
                            <router-link
                                :to="{
                                    name: 'Profile',
                                    params: { userId: post.post_share.user.id },
                                }"
                                class="full-name"
                                >{{
                                    fullname(post.post_share.user)
                                }}</router-link
                            >
                            <router-link
                                v-if="((post.post_share ?? {}).user_2 ?? {}).id"
                                :to="{
                                    name: 'Profile',
                                    params: {
                                        userId: (post.post_share ?? {}).user_2
                                            .id,
                                    },
                                }"
                                class="full-name"
                                ><b-icon icon="caret-right-fill"></b-icon
                                >{{
                                    fullname((post.post_share ?? {}).user_2)
                                }}</router-link
                            >
                            <br />
                            <br />
                            <span
                                v-on:click="hiddenTypeShow = false"
                                style="font-size: 12px"
                            >
                                <router-link
                                    class="link"
                                    :to="{
                                        name: 'Post',
                                        params: { postId: post.post_share.id },
                                    }"
                                >
                                    {{
                                        convertTime(post.post_share.created_at)
                                    }}
                                </router-link>
                                <span v-if="post.post_share.type_show == 1"
                                    ><b-icon icon="dot"></b-icon
                                    ><b-icon icon="globe"></b-icon
                                ></span>
                                <span v-if="post.post_share.type_show == 2"
                                    ><b-icon icon="dot"></b-icon
                                    ><b-icon icon="people"></b-icon
                                ></span>
                                <span v-if="post.post_share.type_show == 3"
                                    ><b-icon icon="dot"></b-icon
                                    ><b-icon icon="lock"></b-icon
                                ></span>
                                <span v-if="post.post_share.type_show == 4"
                                    ><b-icon icon="dot"></b-icon
                                    ><b-icon icon="person"></b-icon
                                ></span>
                                <span v-if="post.post_share.type_show == 5"
                                    ><b-icon icon="dot"></b-icon
                                    ><b-icon icon="person-dash"></b-icon
                                ></span>
                            </span>
                        </div>
                    </div>
                    <div class="main">
                        <div class="content">
                            {{ post.post_share.data }}
                        </div>
                        <div
                            v-if="images_share.length"
                            class="img"
                            style="overflow: hidden; position: relative"
                        >
                            <div
                                v-if="indexImage < countImage"
                                class="next-right"
                                v-on:click="nextImage(1)"
                            >
                                <b-icon icon="chevron-right"></b-icon>
                            </div>
                            <div v-if="indexImage > 1" class="next-left">
                                <b-icon
                                    icon="chevron-left"
                                    v-on:click="nextImage(-1)"
                                ></b-icon>
                            </div>
                            <div class="images-wrapper">
                                <div
                                    class="images"
                                    :id="'images' + post.post_share.id"
                                >
                                    <div
                                        class="image"
                                        v-for="(image, index) in images_share"
                                        :key="index"
                                    >
                                        <img :src="config.url.image + image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="images.length"
                class="img"
                style="overflow: hidden; position: relative"
            >
                <div
                    v-if="indexImage < countImage"
                    class="next-right"
                    v-on:click="nextImage(1)"
                >
                    <b-icon icon="chevron-right"></b-icon>
                </div>
                <div v-if="indexImage > 1" class="next-left">
                    <b-icon
                        icon="chevron-left"
                        v-on:click="nextImage(-1)"
                    ></b-icon>
                </div>
                <div class="images-wrapper">
                    <div class="images" :id="'images' + post.id">
                        <div
                            class="image"
                            v-for="(image, index) in images"
                            :key="index"
                        >
                            <img :src="config.url.image + image" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="count d-flex">
                <div class="like">
                    <div v-if="like_count" v-on:click="showListLike()">
                        <img height="18" :src="config.react.like" width="18" />
                        {{ like_count }}
                    </div>
                </div>
                <div class="comment" v-if="comment_count">
                    {{ comment_count }}
                    bình luận
                </div>
                <div
                    class="share"
                    v-if="share_count"
                    v-on:click="showListShare()"
                >
                    {{ share_count }}
                    chia sẻ
                </div>
            </div>
            <div class="interactive d-flex">
                <div
                    class="like_ d-flex"
                    style="flex: 1"
                    @mouseover="hoverLike = true"
                    v-on:click="like(0)"
                    @mouseleave="hoverLike = false"
                >
                    <div style="margin: auto; position: relative">
                        <div v-if="typeLike == 0">
                            <img src="@/assets/icon/like-2.svg" />&nbsp;Thích
                        </div>
                        <div v-if="typeLike == 1">👍&nbsp;Thích</div>
                        <div v-if="typeLike == 2">❤️&nbsp;Yêu thích</div>
                        <div v-if="typeLike == 3">😆&nbsp;Haha</div>
                        <div v-if="typeLike == 4">😯&nbsp;Wow</div>
                        <div v-if="typeLike == 5">😢&nbsp;Buồn</div>
                        <div v-if="typeLike == 6">😠&nbsp;Phẫn nộ</div>
                        <div
                            class="form-like d-flex"
                            v-if="hoverLike"
                            style="font-size: 20px"
                        >
                            <div
                                class="icon-like"
                                v-on:click.stop
                                v-on:click="like(1)"
                            >
                                👍
                            </div>
                            <div
                                class="icon-like"
                                v-on:click.stop
                                v-on:click="like(2)"
                            >
                                ❤️
                            </div>
                            <div
                                class="icon-like"
                                v-on:click.stop
                                v-on:click="like(3)"
                            >
                                😆
                            </div>
                            <div
                                class="icon-like"
                                v-on:click.stop
                                v-on:click="like(4)"
                            >
                                😯
                            </div>
                            <div
                                class="icon-like"
                                v-on:click.stop
                                v-on:click="like(5)"
                            >
                                😢
                            </div>
                            <div
                                class="icon-like"
                                v-on:click.stop
                                v-on:click="like(6)"
                            >
                                😠
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="comment_ d-flex"
                    v-on:click="focusComment()"
                    style="flex: 1"
                >
                    <div style="margin: auto">
                        <b-icon icon="chat" style="font-size: 24px"></b-icon
                        >&nbsp;Bình luận
                    </div>
                </div>
                <div
                    class="share_ d-flex"
                    style="flex: 1"
                    v-on:click="modal = true"
                >
                    <div style="margin: auto">
                        <b-icon icon="share" style="font-size: 24px"></b-icon
                        >&nbsp;Chia sẻ
                    </div>
                </div>
            </div>
            <div class="list_comment">
                <div class="form-comment d-flex">
                    <div class="avatar_">
                        <img
                            v-if="owner.avatar"
                            :src="
                                'http://127.0.0.1:8000/tmp_images/' +
                                owner.avatar
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                        />
                    </div>
                    <input
                        class="form-input"
                        v-model="comment_lv_1.data"
                        ref="comment"
                        placeholder="Viết bình luận..."
                        @keydown.enter.exact.prevent="sendComment()"
                    />
                </div>
                <div
                    style="cursor: pointer"
                    v-if="stillComment"
                    v-on:click="
                        getComment({ page: page_comment, post_id: post.id })
                    "
                >
                    Xem thêm bình luận
                </div>
                <div
                    class="d-flex item-comment"
                    v-for="comment in listComment"
                    :key="comment"
                >
                    <div class="avatar_comment">
                        <img
                            v-if="comment.user.avatar"
                            :src="
                                'http://127.0.0.1:8000/tmp_images/' +
                                comment.user.avatar
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                        />
                    </div>
                    <div>
                        <div class="content_comment">
                            <router-link
                                :to="{
                                    name: 'Profile',
                                    params: { userId: comment.user.id },
                                }"
                                class="full-name"
                                >{{ fullname(comment.user) }}</router-link
                            ><br />
                            <div>{{ comment.data }}</div>
                        </div>

                        <div class="answer-component">
                            <div
                                style="
                                    margin-right: 20px;
                                    width: 60px;
                                    display: inline-block;
                                    font-weight: 700;
                                    cursor: pointer;
                                "
                                v-on:click="
                                    comment.isAnswer = !comment.isAnswer
                                "
                            >
                                {{ comment.isAnswer ? "Hủy" : "Phản hồi" }}
                            </div>
                            <span> {{ convertTime(comment.created_at) }}</span>
                        </div>
                        <div
                            class="list-answer"
                            v-on:click="
                                getComment({
                                    page: comment.page,
                                    comment_id: comment.id,
                                })
                            "
                            v-if="(comment.listAnswerComment ?? []).length"
                        >
                            <div
                                class="d-flex answer"
                                v-for="answer in comment.listAnswerComment"
                                :key="answer"
                            >
                                <div class="avatar_answer">
                                    <img
                                        v-if="answer.user.avatar"
                                        :src="
                                            'http://127.0.0.1:8000/tmp_images/' +
                                            answer.user.avatar
                                        "
                                    />
                                    <img
                                        v-else
                                        src="@/assets/image/default-user-avatar.png"
                                    />
                                </div>
                                <div>
                                    <div class="content_answer">
                                        <router-link
                                            :to="{
                                                name: 'Profile',
                                                params: {
                                                    userId: answer.user.id,
                                                },
                                            }"
                                            class="full-name"
                                            >{{
                                                fullname(answer.user)
                                            }}</router-link
                                        ><br />

                                        <div>{{ answer.data }}</div>
                                    </div>
                                    <div style="font-size: 13px">
                                        {{ convertTime(answer.created_at) }}
                                    </div>
                                </div>
                            </div>
                            <span v-if="comment.stillAnswer"
                                >Xem thêm phản hồi</span
                            >
                        </div>
                        <div class="d-flex" v-if="comment.isAnswer">
                            <div class="avatar_">
                                <img
                                    v-if="owner.avatar"
                                    :src="
                                        'http://127.0.0.1:8000/tmp_images/' +
                                        owner.avatar
                                    "
                                />
                                <img
                                    v-else
                                    src="@/assets/image/default-user-avatar.png"
                                />
                            </div>
                            <input
                                class="form_answer"
                                v-model="comment.answer.data"
                                :placeholder="
                                    'Trả lời ' + fullname(comment.user) + '...'
                                "
                                @keydown.enter.exact.prevent="
                                    sendAnswer(comment)
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modal">
        <div class="modal1"></div>
        <div class="modal-dialog1">
            <div class="modal-content1" v-click-outside="closeModal">
                <div class="share-header">
                    <span class="fw-bold"
                        >Chia sẻ lên dòng thời gian của bạn</span
                    >
                </div>
                <div class="share-content">
                    <textarea
                        v-model="dataShare"
                        class="content"
                        placeholder="Bạn đang nghĩ gì"
                        rows="4"
                        cols="50"
                    ></textarea>
                </div>
                <div class="share-content-post_">
                    <div class="share-content-post">
                        <div class="d-flex">
                            <div class="avatar">
                                <img
                                    v-if="post.user.avatar"
                                    :src="
                                        'http://127.0.0.1:8000/tmp_images/' +
                                        post.user.avatar
                                    "
                                />
                                <img
                                    v-else
                                    src="@/assets/image/default-user-avatar.png"
                                />
                            </div>
                            <div class="position-relative info-right">
                                <router-link
                                    :to="{
                                        name: 'Profile',
                                        params: { userId: post.user.id },
                                    }"
                                    class="full-name"
                                    >{{ fullname(post.user) }}</router-link
                                >
                                <br />
                                <span
                                    v-on:click="hiddenTypeShow = false"
                                    style="font-size: 12px"
                                >
                                    <router-link
                                        class="link"
                                        :to="{
                                            name: 'Post',
                                            params: { postId: post.id },
                                        }"
                                    >
                                        {{ convertTime(post.created_at) }}
                                    </router-link>
                                    <span v-if="post.type_show == 1"
                                        ><b-icon icon="dot"></b-icon
                                        ><b-icon icon="globe"></b-icon
                                    ></span>
                                    <span v-if="post.type_show == 2"
                                        ><b-icon icon="dot"></b-icon
                                        ><b-icon icon="people"></b-icon
                                    ></span>
                                    <span v-if="post.type_show == 3"
                                        ><b-icon icon="dot"></b-icon
                                        ><b-icon icon="lock"></b-icon
                                    ></span>
                                    <span v-if="post.type_show == 4"
                                        ><b-icon icon="dot"></b-icon
                                        ><b-icon icon="person"></b-icon
                                    ></span>
                                    <span v-if="post.type_show == 5"
                                        ><b-icon icon="dot"></b-icon
                                        ><b-icon icon="person-dash"></b-icon
                                    ></span>
                                </span>
                            </div>
                        </div>
                        <div class="main">
                            <div class="content">
                                {{ post.data }}
                            </div>
                            <div
                                v-if="images.length"
                                class="img"
                                style="overflow: hidden; position: relative"
                            >
                                <div
                                    v-if="indexImage < countImage"
                                    class="next-right"
                                    v-on:click="nextImage(1)"
                                >
                                    <b-icon icon="chevron-right"></b-icon>
                                </div>
                                <div v-if="indexImage > 1" class="next-left">
                                    <b-icon
                                        icon="chevron-left"
                                        v-on:click="nextImage(-1)"
                                    ></b-icon>
                                </div>
                                <div class="images-wrapper">
                                    <div
                                        class="images"
                                        :id="'images' + post.id"
                                    >
                                        <div
                                            class="image"
                                            v-for="(image, index) in images"
                                            :key="index"
                                        >
                                            <img
                                                :src="config.url.image + image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="control-share">
                    <b-row>
                        <b-col cols="3">
                            <button
                                v-on:click="hiddenTypeShow = false"
                                class="form-control type-show"
                            >
                                <span v-if="type_show == 1"
                                    ><b-icon icon="globe"></b-icon> Công
                                    khai</span
                                >
                                <span v-if="type_show == 2"
                                    ><b-icon icon="people"></b-icon> Bạn
                                    bè</span
                                >
                                <span v-if="type_show == 3"
                                    ><b-icon icon="lock"></b-icon> Chỉ mình
                                    tôi</span
                                >
                                <span v-if="type_show == 4"
                                    ><b-icon icon="person"></b-icon> Bạn bè cụ
                                    thể</span
                                >
                                <span v-if="type_show == 5"
                                    ><b-icon icon="person-dash"></b-icon> Bạn bè
                                    trừ</span
                                >
                                <ul
                                    v-if="!hiddenTypeShow"
                                    v-click-outside="hideShow"
                                    class="list-group list-type-show position-absolute"
                                >
                                    <li
                                        v-on:click="hideShow(1)"
                                        class="list-item"
                                    >
                                        <b-icon icon="globe"></b-icon> Công khai
                                    </li>
                                    <li
                                        v-on:click="hideShow(2)"
                                        class="list-item"
                                    >
                                        <b-icon icon="people"></b-icon> Bạn bè
                                    </li>
                                    <li
                                        v-on:click="hideShow(3)"
                                        class="list-item"
                                    >
                                        <b-icon icon="lock"></b-icon> Chỉ mình
                                        tôi
                                    </li>
                                    <li
                                        v-on:click="hideShow(4)"
                                        class="list-item"
                                    >
                                        <b-icon icon="person"></b-icon> Bạn bè
                                        cụ thể
                                    </li>
                                    <li
                                        v-on:click="hideShow(5)"
                                        class="list-item"
                                    >
                                        <b-icon icon="person-dash"></b-icon> Bạn
                                        bè trừ
                                    </li>
                                </ul>
                            </button>
                        </b-col>
                        <b-col offset="6" cols="3">
                            <button
                                v-on:click="sharePost()"
                                class="btn btn-success"
                                style="float: right"
                            >
                                Chia sẻ
                            </button>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modal_like">
        <div class="modal1"></div>
        <div class="modal-dialog1">
            <div class="modal-content1" v-click-outside="closeModalListLike">
                <div class="like-header">
                    <span class="fw-bold">Những người thích bài viết</span>
                </div>
                <div class="list_like">
                    <div
                        v-for="item in list_like"
                        :key="item"
                        class="d-flex"
                        style="padding: 10px"
                    >
                        <div class="avatar">
                            <img
                                v-if="item.user.avatar"
                                :src="
                                    'http://127.0.0.1:8000/tmp_images/' +
                                    item.user.avatar
                                "
                            />
                            <img
                                v-else
                                src="@/assets/image/default-user-avatar.png"
                            />
                        </div>
                        <div class="position-relative info-right">
                            <router-link
                                :to="{
                                    name: 'Profile',
                                    params: { userId: item.user.id },
                                }"
                                class="full-name"
                                >{{ fullname(item.user) }}</router-link
                            >
                        </div>
                        <div class="float:right">
                            <div v-if="item.type == 1">👍</div>
                            <div v-if="item.type == 2">❤️</div>
                            <div v-if="item.type == 3">😆</div>
                            <div v-if="item.type == 4">😯</div>
                            <div v-if="item.type == 5">😢</div>
                            <div v-if="item.type == 6">😠</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modal_share">
        <div class="modal1"></div>
        <div class="modal-dialog1">
            <div class="modal-content1" v-click-outside="closeModalListShare">
                <div class="share-header">
                    <span class="fw-bold">Những người chia sẻ bài viết</span>
                </div>
                <div class="list">
                    <div
                        v-for="item in list_share"
                        :key="item"
                        class="d-flex"
                        style="padding: 10px"
                    >
                        <div class="avatar">
                            <img
                                v-if="item.user.avatar"
                                :src="
                                    'http://127.0.0.1:8000/tmp_images/' +
                                    item.user.avatar
                                "
                            />
                            <img
                                v-else
                                src="@/assets/image/default-user-avatar.png"
                            />
                        </div>
                        <div class="position-relative info-right">
                            <router-link
                                :to="{
                                    name: 'Profile',
                                    params: { userId: item.user.id },
                                }"
                                class="full-name"
                                >{{ fullname(item.user) }}</router-link
                            >
                        </div>
                        <div class="float:right">
                            <router-link
                                :to="{
                                    name: 'Post',
                                    params: { postId: item.id },
                                }"
                                >Link</router-link
                            >
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
// import EventBus from "@/EventBus.js";
import config from "@/config";

export default {
    computed: {},
    data() {
        return {
            images: [],
            images_share:
                JSON.parse((this.post.post_share ?? {}).src_images ?? "null") ??
                [],
            countImage: 0,
            owner: JSON.parse(localStorage.getItem("userInfo")),
            config: config,
            typeLike: (this.post.is_like[0] ?? {}).type ?? 0,
            width_image: 0,
            positionX: 0,
            indexImage: 1,
            hoverLike: false,
            comment_lv_1: {
                data: "",
                src_images: "",
            },
            stillComment: true,
            page_comment: 0,
            listComment: [],
            modal: false,
            dataShare: "",
            type_show: 1,
            modal_like: false,
            modal_share: false,
            hiddenTypeShow: true,
            like_count: this.post.like_count ?? 0,
            comment_count: this.post.comment_count ?? 0,
            share_count: this.post.share_count ?? 0,
            page_like: 0,
            list_like: [],
            page_share: 0,
            list_share: [],
        };
    },
    created() {
        this.getComment({
            page: 1,
            comment_id: null,
            post_id: this.post.id,
        });
        this.images = JSON.parse((this.post ?? {}).src_images ?? "null") ?? [];
    },
    methods: {
        showListLike() {
            this.modal_like = true;
            if (this.page_like == 0) {
                this.loadListLike();
            }
        },
        showListShare() {
            this.modal_share = true;
            if (this.page_share == 0) {
                this.loadListShare();
            }
        },
        loadListLike() {
            Axios.get(
                "like/get_list?post_id=" +
                    this.post.id +
                    "&page=" +
                    (this.page_like + 1)
            )
                .then((res) => {
                    if (res.data.status == "success") {
                        console.log(res.data.data);
                        this.list_like = this.list_like.concat(res.data.data);
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        },
        loadListShare() {
            var post_id = this.post.post_id ? this.post.post_id : this.post.id;
            Axios.get(
                "share/get_list?post_id=" +
                    post_id +
                    "&page=" +
                    (this.page_share + 1)
            )
                .then((res) => {
                    if (res.data.status == "success") {
                        console.log(res.data.data);
                        this.list_share = this.list_share.concat(res.data.data);
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        },
        closeModal() {
            this.modal = false;
        },
        closeModalListLike() {
            this.modal_like = false;
        },
        closeModalListShare() {
            this.modal_share = false;
        },
        fullname: function (user) {
            return user.first_name + " " + user.last_name;
        },
        focusComment() {
            this.$refs.comment.focus();
        },
        nextImage(param) {
            console.log(param);
            this.indexImage += param;
            this.positionX -= param * this.width_image;
            var slidechuyen = document.getElementById("images" + this.post.id);
            slidechuyen.style =
                "transform: translateX(" + this.positionX + "px)";
        },
        like(type) {
            Axios.post("like", {
                post_id: this.post.id,
                type: type,
            })
                .then((res) => {
                    if (type == 0) {
                        this.like_count--;
                    } else this.like_count++;
                    if (res.data.status == "success") {
                        this.typeLike = type;
                    } else console.log(res.data.message);
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        },
        hideShow(type) {
            this.hiddenTypeShow = true;
            if ([1, 2, 3, 4, 5].includes(type)) {
                this.type_show = type;
            }
        },
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
                    (date.getDate() < 10
                        ? "0" + date.getDate()
                        : date.getDate()) +
                    "-" +
                    (date.getMonth() < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1) +
                    "-" +
                    (1900 + date.getYear())
                );
            } else return;
        },
        sendComment() {
            if (this.comment_lv_1.data || this.comment_lv_1.src_images) {
                Axios.post("comment/create", {
                    post_id: this.post.id,
                    data: this.comment_lv_1.data,
                    src_images: this.comment_lv_1.src_images,
                })
                    .then((response) => {
                        if (response.data.status == "success") {
                            this.comment_count++;
                            this.comment_lv_1.data = "";
                            this.comment_lv_1.src_images = "";
                            var comment = response.data.data;
                            comment.stillAnswer = true;
                            comment.page = 0;
                            comment.user = this.owner;
                            comment.isAnswer = false;
                            comment.answer = {
                                data: "",
                                src_images: "",
                            };
                            comment.listAnswerComment = [];
                            this.listComment.push(comment);
                        } else {
                            console.log(response.data.message);
                        }
                    })
                    .catch(() => {
                        alert("Đã có lỗi xảy ra, vui lòng thử lại");
                    });
            }
        },
        sharePost() {
            var post = {};
            post.type_show = this.type_show;
            post.data = this.dataShare;
            post.post_id = this.post.post_id ? this.post.post_id : this.post.id;
            Axios.post("post/create", post)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.modal = false;
                        this.dataShare = "";
                        if (!this.post.post_id) this.share_count++;
                        alert("Chia sẻ thành công lên trang cá nhân của bạn");
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau3");
                });
        },
        sendAnswer(comment) {
            if (comment.answer.data || comment.answer.src_images) {
                Axios.post("comment/create", {
                    comment_id: comment.id,
                    data: comment.answer.data,
                    src_images: comment.answer.src_images,
                })
                    .then((response) => {
                        if (response.data.status == "success") {
                            comment.answer.data = "";
                            comment.answer.src_images = "";
                            comment.isAnswer = false;
                            var data = response.data.data;
                            data.page = 0;
                            data.user = this.owner;
                            comment.listAnswerComment.unshift(data);
                        } else {
                            console.log(response.data.message);
                        }
                    })
                    .catch(() => {
                        alert("Đã có lỗi xảy ra, vui lòng thử lại");
                    });
            }
        },
        getComment(options) {
            var url = "comment/get?";
            if (options.post_id) {
                this.page_comment++;
                url +=
                    "page=" + this.page_comment + "&post_id=" + options.post_id;
            } else if (options.comment_id) {
                this.listComment.forEach((comment) => {
                    if (comment.id === options.comment_id) {
                        comment.page++;
                        url += "page=" + comment.page;
                        return;
                    }
                });
                url += "&comment_id=" + options.comment_id;
            }
            Axios.get(url)
                .then((response) => {
                    if (response.data.status == "success") {
                        if (options.post_id) {
                            var data = response.data.data;
                            this.listComment = data
                                .reverse()
                                .concat(this.listComment);
                            data.forEach((comment) => {
                                comment.stillAnswer = true;
                                comment.page = 0;
                                comment.isAnswer = false;
                                comment.answer = {
                                    data: "",
                                    src_images: "",
                                };
                                this.getComment({
                                    comment_id: comment.id,
                                });
                            });
                            if (
                                (response.data.data.length < 2 &&
                                    this.page_comment == 1) ||
                                (response.data.data.length < 5 &&
                                    this.page_comment > 1)
                            ) {
                                this.stillComment = false;
                            }
                        } else {
                            this.listComment.forEach((comment) => {
                                if (comment.id === options.comment_id) {
                                    if (!comment.listAnswerComment)
                                        comment.listAnswerComment = [];
                                    comment.listAnswerComment =
                                        comment.listAnswerComment.concat(
                                            response.data.data
                                        );
                                    if (
                                        (response.data.data.length < 2 &&
                                            comment.page == 1) ||
                                        (response.data.data.length < 5 &&
                                            comment.page > 1)
                                    ) {
                                        comment.stillAnswer = false;
                                    }
                                }
                            });
                        }
                    } else {
                        console.log(response.data.message);
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        },
    },
    mounted() {
        this.countImage = this.images.length;
        this.width_image = (
            document.getElementById("images" + this.post.id) ?? {}
        ).offsetWidth;
    },
    props: {
        post: Object,
    },
};
</script>
<style scoped lang="scss">
.count {
    padding: 5px 0;
}
.form-post {
    padding: 15px;
    padding-bottom: 5px;
    border-radius: 10px;
    background: white;
    word-wrap: break-word;
    margin: 20px 0;
}
.avatar_ img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto;
}
.avatar_comment img,
.avatar_answer img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.avatar,
.avatar_,
.avatar_comment,
.avatar_answer {
    display: flex;
    padding-right: 10px;
}
.avatar img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
}
.info-right {
    line-height: 16px;
    font-size: 14px;
    flex: 1;
    padding: 0;
}
.full-name {
    float: left;
    font-weight: 600;
    text-decoration: none;
    color: black;
}
.content {
    padding: 10px 0;
}
.like {
    flex: 1;
}
.share {
    margin-left: 10px;
}
.image {
    max-height: 100%;
    width: 100%;
    flex: 1 0 100%;
    display: flex;
}
.image img {
    width: 100%;
    object-fit: contain;
    margin: auto;
}
.images {
    display: flex;
    object-fit: contain;
    max-height: 100%;
    transition: transform 0.25s linear;
}
.images-wrapper {
    height: 450px;
    width: 100%;
    position: relative;
    left: 0;
}
.next-right,
.next-left {
    border-radius: 50%;
    background: #7c7272;
    padding: 3px;
    line-height: 16px;
    position: absolute;
    top: 48%;
    display: none;
    z-index: 1;
}
.img:hover .next-left,
.img:hover .next-right {
    cursor: pointer;
    display: block;
}
.next-left {
    left: 0;
}
.next-right {
    right: 0;
}
.interactive {
    border-top: 1px solid #f2f2f2;
    padding: 0 5px;
}
.list_comment {
    border-top: 1px solid #f2f2f2;
    position: relative;

    padding: 10px 5px 0 5px;
}
.form-input {
    flex: 1;
}
.form-input,
.form_answer {
    display: block;
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
.form-like {
    top: 0;
    transform: translate(-50%, -100%);
    position: absolute;
    background: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 10px;
}
.like_:hover {
    background: #f2f2f2;
}
.like_,
.share_,
.comment_ {
    padding: 10px 0;
}
.icon-like {
    padding: 0 5px;
    line-height: 24px;
}
.icon-like:hover {
    cursor: pointer;
    font-size: 30px;
    padding: 0;
}
.form-comment {
    margin-bottom: 16px;
}
.content_comment {
    display: inline-block;
    background-color: #f2f2f2;
    position: relative;
    padding: 5px 15px;
    border-radius: 10px;
    max-width: 60%;
    word-wrap: break-word;
}
.content_answer {
    display: inline-block;
    background-color: #f2f2f2;
    padding: 5px 15px;
    border-radius: 10px;
    max-width: 455px;
    word-wrap: break-word;
}
.content_comment div {
    word-wrap: break-word;
}
.answer-component {
    font-size: 13px;
    top: 100%;
    width: 400px;
}
.item-comment {
    margin: 15px 0;
    position: relative;
}
.answer {
    margin-bottom: 10px;
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
    top: 5%;
    right: 0;
    bottom: 0;
    left: 0;
}
.modal-content1 {
    position: relative;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
}
.share-header,
.like-header,
.comment-header {
    padding: 10px;
    border-radius: 0.3rem;
    font-size: 20px;
    background-color: #f2f2f2;
}
.content {
    padding: 10px;
    border: 0;
}
.content:focus {
    outline: none;
}
.type-show {
    position: relative;
    padding: 0 5px;
}
.list-type-show {
    position: absolute;
    top: 0;
    transform: translateY(-100%);
}
.control-share {
    padding: 10px;
}
.list-type-show li {
    border-bottom: 1px solid black;
    padding: 0 10px;
}
.list-type-show {
    margin-top: 10px;
    background: white;
    width: 121%;
    list-style: none;
    border: 1px solid black;
}
.list-type-show li:hover {
    background: rgb(139, 204, 139);
    color: white;
}
.share-content-post {
    border: 1px solid #212529;
    border-radius: 10px;
    padding: 10px;
}
.share-content-post_ {
    padding: 0 10px;
}
.link {
    text-decoration: none;
    color: black;
}
.list {
}
.list {
    overflow: auto;
    height: 400px;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
.list:hover::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.list::-webkit-scrollbar {
    width: 5px !important;
    background: white;
}
.list:hover::-webkit-scrollbar-thumb {
    background: #646668;
    height: 100px;
    border-radius: 5px;
}
</style>
