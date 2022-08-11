<template>
    <NavbarLeftAdmin />
    <div class="container" style="margin-left: 200px; max-width: 850px">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>Thành viên</b></h2>
                    </div>
                    <div class="col-sm-1s">
                        <input
                            v-model="key_search"
                            v-on:keyup="search(key_search)"
                            class="form-input"
                            placeholder="Lọc thành viên"
                        />
                    </div>
                </div>
            </div>
            <!-- {{ usersObject }} -->
            <table class="table table-striped table-hover item">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Quyền tài khoản</th>
                        <th>Tác vụ</th>
                    </tr>
                </thead>
                <tbody v-for="user in usersObject" :key="user">
                    <tr>
                        <td>
                            <img
                                v-if="user.avatar"
                                class="avatar"
                                :src="config.url.image + user.avatar"
                            />
                            <img
                                class="avatar"
                                v-else
                                src="@/assets/image/default-user-avatar.png"
                            />
                            <router-link
                                :to="{
                                    name: 'Profile',
                                    params: { userId: user.id },
                                }"
                                class="fw-bold text-decoration-none link-user"
                            >
                                {{ user.first_name + " " + user.last_name }}
                            </router-link>
                        </td>
                        <td>{{ user.email }}</td>

                        <td>
                            {{ user.phone ? user.phone : "Chưa cập nhật" }}
                        </td>

                        <td>
                            <div v-if="user.level === 0">Vô hiệu hoá</div>
                            <div v-if="user.level === 1">LV1-Nhân viên</div>
                            <div v-if="user.level === 2">
                                LV2-Phó trưởng phòng/ban
                            </div>
                            <div v-if="user.level === 3">
                                LV3-Trưởng phòng/ban
                            </div>
                            <div v-if="user.level === 4">LV4-Ban giám đốc</div>
                        </td>
                        <td>
                            <b-dropdown
                                id="dropdown-1"
                                text="Phân quyền user"
                                class="m-md-2"
                            >
                                <b-dropdown-item v-on:click="assign(user.id, 4)"
                                    >LV4-Ban giám đốc</b-dropdown-item
                                >
                                <b-dropdown-item v-on:click="assign(user.id, 3)"
                                    >LV3-Trưởng phòng/ban</b-dropdown-item
                                >
                                <b-dropdown-item v-on:click="assign(user.id, 2)"
                                    >LV2-Phó trưởng phòng/ban</b-dropdown-item
                                >
                                <b-dropdown-divider></b-dropdown-divider>

                                <b-dropdown-item v-on:click="assign(user.id, 1)"
                                    >LV1- Nhân viên</b-dropdown-item
                                >
                                <b-dropdown-item v-on:click="assign(user.id, 0)"
                                    >Vô hiệu hoá tài khoản</b-dropdown-item
                                >
                                <b-dropdown-item v-on:click="assign(user.id, 1)"
                                    >Kích hoạt tài khoản</b-dropdown-item
                                >
                            </b-dropdown>
                        </td>
                    </tr>
                </tbody>
            </table>
            <paginate
                :page-count="sumPage"
                :click-handler="getListuser"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
            >
            </paginate>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NavbarLeftAdmin from "@/components/admin/NavbarLeftAdmin.vue";
import Axios from "@/components/Axios.js";
import config from "@/config";
import Paginate from "vuejs-paginate-next";

export default {
    name: "ManagerUser",
    created() {
        this.getListuser(1);
    },
    components: { NavbarLeftAdmin, Paginate },

    data() {
        return {
            sumPage: 10,
            currenPage: 1,
            config: config,
            usersObject: {},
            errors: "",
            page: 1,
            stillUser: true,
            i: 1,
            key_search: "",
            id_ban: 1,
            optionManager: false,
            user_id: 1,
            role: 1,
        };
    },
    methods: {
        confirm() {
            confirm("Bạn có muốn cho người này làm quản trị viên");
        },
        search(data) {
            if (!data) this.getLisUser(1);
            else
                Axios.get("user/searchUser?user_name=" + data).then(
                    (response) => {
                        if (response.data.status == "success") {
                            this.usersObject = response.data.data;
                        }
                    }
                );
        },

        getListuser(pageNumber) {
            Axios.get("user/list_user?page=" + pageNumber).then((response) => {
                if (response.data.status == "success") {
                    this.usersObject = response.data.data[0];
                    this.sumPage = Math.floor(response.data.data[1] / 6 + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    this.erros = "";
                } else {
                    this.errors = response.data.message;
                }
            });
        },

        assign($user_id, $role) {
            this.user_id = $user_id;
            this.role = $role;
            var confi;
            switch (this.role) {
                case 1:
                    confi = confirm(
                        "Bạn có muốn cho người này phân quyền nhân viên"
                    );
                    break;
                case 2:
                    confi = confirm(
                        "Bạn có muốn cho người này phân quyền phó phòng/ban"
                    );
                    break;
                case 3:
                    confi = confirm(
                        "Bạn có muốn cho người này phân quyền trưởng phòng/ban"
                    );
                    break;
                case 4:
                    confi = confirm(
                        "Bạn có muốn cho người này phân quyền ban giám đốc"
                    );
                    break;
                case 0:
                    confi = confirm("Bạn có muốn vô hiệu hoá tài khoản này");
                    break;
                case 5:
                    confi = confirm("Bạn có muốn kích hoạt tài khoản này");
                    break;
                default:
                    confi = confirm(
                        "Bạn có muốn gỡ bỏ quyền hiện tại của người này"
                    );
                    break;
            }
            console.log(confi);
            if (confi) {
                Axios.post(
                    "admin/assignRole?user_id=" +
                        this.user_id +
                        "&role=" +
                        this.role
                )
                    .then((response) => {
                        if (response.data.status == "success") {
                            alert(response.data.message);
                        }
                    })
                    .catch(() => {
                        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                    });
            }
            this.getListuser(1);
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

.list-user {
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
    color: #ffc107;
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

.options-user {
    background: white;
    padding: 10px;
    border-radius: 5px;
    color: black;
    border: 1px solid #f2f2f2;
    position: absolute;
    top: 100%;
    width: 120px;
    z-index: 1;
}

.content {
    padding: 10px 10px;
}
</style>
