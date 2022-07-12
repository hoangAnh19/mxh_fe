<template>
    <NavbarLeftAdmin />
    <div class="container" style="margin-left: 200px; max-width: 850px">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>Bài viết</b></h2>
                    </div>
                    <div class="col-sm-1s">
                        <input
                            v-model="key_search"
                            v-on:keyup="search(key_search)"
                            class="form-input"
                            placeholder="Lọc thành bài viết theo nội dung"
                        />
                    </div>
                </div>
            </div>
            <!-- {{ postObject }} -->
            <table class="table table-striped table-hover item">
                <thead>
                    <tr>
                        <th>Post ID</th>
                        <th>Người đăng</th>
                        <th>Phone</th>
                        <th>Nội dung</th>
                        <th>Tác vụ</th>
                    </tr>
                </thead>
                <tbody v-for="post in postObject" :key="post">
                    <tr>
                        <td>{{ post.id }}</td>
                        <td>
                            {{ post.user.first_name + post.user.last_name }}
                        </td>
                        <td>{{ post.user.phone }}</td>
                        <td>{{ post.data }}</td>
                        <td>
                            <router-link
                                class="link"
                                :to="{
                                    name: 'Post',
                                    params: { postId: post.id },
                                }"
                                style="padding: 10px"
                            >
                                Xem
                            </router-link>

                            <a
                                class="delete"
                                data-toggle="modal"
                                v-on:click="deletePost(post.id)"
                                >Xoá</a
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NavbarLeftAdmin from "@/components/admin/NavbarLeftAdmin.vue";
import Axios from "@/components/Axios.js";
import config from "@/config";

export default {
    name: "ManagerPost",
    created() {
        this.getListPost();
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
                    document.body.scrollHeight &&
                !this.ajaxLock &&
                this.stillPost
            ) {
                this.getList();
            }
        };
    },
    components: { NavbarLeftAdmin },

    data() {
        return {
            config: config,
            errors: "",
            page: 1,
            stillPost: true,
            key_search: "",
            listPost: [],
            postObject: {},
        };
    },
    methods: {
        search(data) {
            Axios.get("post/searchPost?data=" + data).then((response) => {
                if (response.data.status == "success") {
                    this.postObject = response.data.data;
                }
            });
        },

        getListPost() {
            Axios.get("post/get_list_admin").then((response) => {
                this.postObject = response.data.data;
            });
        },

        getPost(id) {
            Axios.get("post/show?post_id=" + id)
                .then((response) => {
                    if (response.data.length) {
                        console.log(this.post);
                        this.post = response.data[0];
                        console.log(this.post);
                    } else {
                        alert("Bài viết không tồn tại");
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
        },

        async deletePost(id) {
            Axios.post("admin/deletePostAdmin?id=" + id).then((response) => {
                if (response.data.status == "success") {
                    console.log("success");
                }
            });
            await this.getListPost();
        },
    },
};
</script>
<style scoped lang="scss">
.avatar {
    width: 70px;
    height: 70px;
    border: 1px solid rgb(145, 94, 94);
    border-radius: 50%;
}

.form-input {
    margin-left: auto;
    display: block;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: 20px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
input:focus {
    outline: none;
}

.top {
    display: flex;
    margin-bottom: 20px;
}

.item {
    display: block !important;
}
.list {
    text-align: initial;
    padding: 10px;
}
.form-month {
    border-radius: 20px;
    background-color: white;
    margin: 20px 0;
}

.list-friend {
    width: 60%;
    margin: 20px auto 0 auto;
}
body {
    color: #566787;
    background: #f5f5f5;
    font-family: "Varela Round", sans-serif;
    font-size: 13px;
}
.table-wrapper {
    background: #fff;
    padding: 20px 25px;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
    padding-bottom: 15px;
    background: #435d7d;
    color: #fff;
    padding: 16px 30px;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}
.table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
}
.table-title .btn-group {
    float: right;
}
.table-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
}
.table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
}
.table-title .btn span {
    float: left;
    margin-top: 2px;
}
table.table tr th,
table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
}
table.table tr th:first-child {
    width: 60px;
}
table.table tr th:last-child {
    width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
}
table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}
table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
}
table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
    outline: none !important;
}
table.table td a:hover {
    color: #2196f3;
}
table.table td a.edit {
    color: #2196f3;
    padding: 10px;
}
table.table td a.edit:hover {
    cursor: pointer;
}
table.table td a.delete {
    color: #f44336;
}
table.table td a.delete:hover {
    cursor: pointer;
}
table.table td i {
    font-size: 19px;
}
table.table .avatar {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}
.pagination {
    float: right;
    margin: 0 0 5px;
}
.pagination li a {
    border: none;
    font-size: 13px;
    min-width: 30px;
    min-height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 2px !important;
    text-align: center;
    padding: 0 6px;
}
.pagination li a:hover {
    color: #666;
}
.pagination li.active a,
.pagination li.active a.page-link {
    background: #03a9f4;
}
.pagination li.active a:hover {
    background: #0397d6;
}
.pagination li.disabled i {
    color: #ccc;
}
.pagination li i {
    font-size: 16px;
    padding-top: 6px;
}
.hint-text {
    float: left;
    margin-top: 10px;
    font-size: 13px;
}
/* Custom checkbox */
.custom-checkbox {
    position: relative;
}
.custom-checkbox input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    margin: 5px 0 0 3px;
    z-index: 9;
}
.custom-checkbox label:before {
    width: 18px;
    height: 18px;
}
.custom-checkbox label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    background: white;
    border: 1px solid #bbb;
    border-radius: 2px;
    box-sizing: border-box;
    z-index: 2;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
    content: "";
    position: absolute;
    left: 6px;
    top: 3px;
    width: 6px;
    height: 11px;
    border: solid #000;
    border-width: 0 3px 3px 0;
    transform: inherit;
    z-index: 3;
    transform: rotateZ(45deg);
}
.custom-checkbox input[type="checkbox"]:checked + label:before {
    border-color: #03a9f4;
    background: #03a9f4;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
    border-color: #fff;
}
.custom-checkbox input[type="checkbox"]:disabled + label:before {
    color: #b8b8b8;
    cursor: auto;
    box-shadow: none;
    background: #ddd;
}
/* Modal styles */
.modal .modal-dialog {
    max-width: 400px;
}
.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
    padding: 20px 30px;
}
.modal .modal-content {
    border-radius: 3px;
}
.modal .modal-footer {
    background: #ecf0f1;
    border-radius: 0 0 3px 3px;
}
.modal .modal-title {
    display: inline-block;
}
.modal .form-control {
    border-radius: 2px;
    box-shadow: none;
    border-color: #dddddd;
}
.modal textarea.form-control {
    resize: vertical;
}
.modal .btn {
    border-radius: 2px;
    min-width: 100px;
}
.modal form label {
    font-weight: normal;
}
</style>
