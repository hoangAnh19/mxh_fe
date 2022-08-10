<template>
    <NavbarLeftAdmin />
    <div class="container" style="margin-left: 200px; max-width: 850px">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>Phòng ban</b></h2>
                    </div>

                    <div class="col-sm-6">
                        {{ dataCountMemberBar }}
                        <b-dropdown
                            id="dropdown-1"
                            text="Biểu đồ phân tích "
                            class="m-md-2"
                        >
                            <b-dropdown-item
                                v-on:click="
                                    {
                                        chartBarMember();
                                    }
                                "
                                >Biểu đồ phân tích Member</b-dropdown-item
                            >
                            <b-dropdown-item v-on:click="chartBarPost()"
                                >Biểu đồ phân tích Bài viết</b-dropdown-item
                            >
                            <b-dropdown-item v-on:click="assign(user.id, 4)"
                                >Biểu đồ phân tích</b-dropdown-item
                            >
                        </b-dropdown>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover item">
                <thead>
                    <tr>
                        <th>Tên group</th>
                        <th>Số lượng thành viên</th>
                        <th>Số lượng bài viết</th>
                        <th>Số lượng thành viên chờ phê duyệt</th>
                        <th>Số lượng bài viết chờ phê duyệt</th>
                    </tr>
                </thead>
                <tbody v-for="group in listGroup" :key="group">
                    <tr>
                        <td>
                            {{ group.name }}
                        </td>
                        <td>{{ group.countMember }}</td>
                        <td>{{ group.countPost }}</td>
                        <td>{{ group.countMemberPending }}</td>
                        <td>
                            {{
                                group.countPostPending
                                    ? group.countPostPending
                                    : 0
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <canvas id="myChartBarMember" width="250" height="250"></canvas>
            <canvas id="myChartPieMember" width="250" height="250"></canvas>
            <canvas id="myChartBarPost" width="400" height="400"></canvas>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NavbarLeftAdmin from "@/components/admin/NavbarLeftAdmin.vue";
import Axios from "@/components/Axios.js";
import config from "@/config";
import Chart from "chart.js/auto";

export default {
    name: "ManagerPost",

    computed: {},

    mounted() {},

    async created() {
        await this.getListGroup();
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
            listGroup: [],
            labelMemberBar: [],
            dataCountMemberBar: [],
            dataCountMemberPendingBar: [],
            dataCountPost: [],
            dataCountPostPending: [],
            showChartBarMember: false,
        };
    },
    methods: {
        chartBarMember() {
            window.scrollTo({ top: 0, behavior: "smooth" });
            let ctxBar = document
                .getElementById("myChartBarMember")
                .getContext("2d");

            let dataBar = {
                labels: this.labelMemberBar,

                datasets: [
                    {
                        label: "Biểu đồ phân tích số lượng thành viên",
                        data: this.dataCountMemberBar,
                        backgroundColor: [
                            "rgba(255, 99, 136,1)",
                            "rgba(255, 159, 64,1)",
                            "rgba(255, 205, 86,1)",
                            "rgba(75, 192, 192,1)",
                            "rgba(54, 162, 235,1)",
                            "rgba(153, 102, 255,1)",
                            "rgba(201, 203, 207,1)",
                        ],
                        hoverBackgroundColor: "rgba(0,51,255,4)",
                        hoverBorderColor: "orange",

                        borderColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                    },
                    {
                        label: "Biểu đồ phân tích số lượng thành viên chờ duyệt",
                        data: this.dataCountMemberPendingBar,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.5)",
                            "rgba(255, 159, 64, 0.5)",
                            "rgba(255, 205, 86, 0.5)",
                            "rgba(75, 192, 192, 0.5)",
                            "rgba(54, 162, 235, 0.5)",
                            "rgba(153, 102, 255, 0.5)",
                            "rgba(201, 203, 207, 0.5)",
                        ],
                        hoverBackgroundColor: "rgba(0,51,255,4)",
                        hoverBorderColor: "orange",
                        borderColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            let myChartBarMember = new Chart(ctxBar, {
                type: "bar",
                data: dataBar,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
            myChartBarMember;
            window.scrollTo(0, document.body.scrollHeight);
        },

        chartBarPost() {
            window.scrollTo({ bottom: 0, behavior: "smooth" });
            console.log("dataCountPostPending", this.dataCountPostPending);
            const ctxBar = document
                .getElementById("myChartBarPost")
                .getContext("2d");

            let dataBar = {
                labels: this.labelMemberBar,

                datasets: [
                    {
                        label: "Biểu đồ phân tích số lượng bài viết",
                        data: this.dataCountPost,
                        backgroundColor: [
                            "rgba(255, 99, 136,1)",
                            "rgba(255, 159, 64,1)",
                            "rgba(255, 205, 86,1)",
                            "rgba(75, 192, 192,1)",
                            "rgba(54, 162, 235,1)",
                            "rgba(153, 102, 255,1)",
                            "rgba(201, 203, 207,1)",
                        ],
                        hoverBackgroundColor: "rgba(0,51,255,4)",
                        hoverBorderColor: "orange",
                        borderColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                    },
                    {
                        label: "Biểu đồ phân tích số lượng bài viết chờ duyệt",
                        data: this.dataCountPostPending,
                        backgroundColor: [
                            "rgba(255, 99, 136,0.5)",
                            "rgba(255, 159, 64,0.5)",
                            "rgba(255, 205, 86,0.5)",
                            "rgba(75, 192, 192,0.5)",
                            "rgba(54, 162, 235,0.5)",
                            "rgba(153, 102, 255,0.5)",
                            "rgba(201, 203, 207,0.5)",
                        ],
                        hoverBackgroundColor: "rgba(0,51,255,4)",
                        hoverBorderColor: "orange",
                        borderColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            let myChartBarPost = new Chart(ctxBar, {
                type: "bar",
                data: dataBar,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            myChartBarPost;
            window.scrollTo(0, document.body.scrollHeight);
        },
        chartPieMember() {
            let ctxPie = document
                .getElementById("myChartPieMember")
                .getContext("2d");
            let dataPie = {
                labels: this.labelMemberBar,
                datasets: [
                    {
                        label: "Biểu đồ phân tích số lượng thành viên",
                        data: this.dataCountMemberBar,
                        backgroundColor: [
                            "rgb(255, 99, 132)",
                            "rgb(54, 162, 235)",
                            "rgb(255, 205, 86)",
                        ],
                        hoverOffset: 4,
                    },
                ],
            };
            let myChartPieMember = new Chart(ctxPie, {
                type: "doughnut",
                data: dataPie,
            });

            myChartPieMember;
        },

        getListGroup() {
            Axios.get("group/get_fullList_group").then((response) => {
                if (response.data.status == "success") {
                    this.listGroup = response.data.group;
                    this.listGroup.forEach((item) => {
                        Axios.get(
                            "group/get_count_member?group_id=" + item.id
                        ).then((response) => {
                            if (response.data.status == "success") {
                                item.countMember = response.data.data;
                                this.dataCountMemberBar.push(
                                    response.data.data
                                );
                            } else {
                                console.log(this.data.message);
                            }
                        });

                        Axios.get(
                            "group/get_count_pending?group_id=" + item.id
                        ).then((response) => {
                            if (response.data.status == "success") {
                                item.countMemberPending = response.data.data;
                                this.dataCountMemberPendingBar.push(
                                    response.data.data
                                );
                            } else {
                                console.log(this.data.message);
                            }
                        });

                        Axios.get("post/get_count?group_id=" + item.id).then(
                            (response) => {
                                if (response.data.status == "success") {
                                    item.countPost = response.data.data;
                                    this.dataCountPost.push(response.data.data);
                                } else {
                                    console.log(this.data.message);
                                }
                            }
                        );

                        Axios.get(
                            "post/get_list_post_browse?group_id=" +
                                item.id +
                                "&page=1"
                        )
                            .then((response) => {
                                this.listPost = response.data.data;
                                if (response.data.data.length)
                                    item.countPostPending =
                                        response.data.data.length;
                                this.dataCountPostPending.push(
                                    response.data.data.length
                                );
                                console.log(
                                    "listGroup in method",
                                    this.listGroup
                                );
                            })
                            .catch(() => {
                                alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                            });
                    });

                    this.listGroup.forEach((item) => {
                        console.log("item", item);
                        this.labelMemberBar.push(item.name);
                    });
                } else {
                    console.log(this.data.message);
                }
            });
        },

        getCountMember() {
            this.listGroup.forEach((item) => {
                Axios.get(
                    "group/get_count_member?group_id=" + item.groupId
                ).then((response) => {
                    if (response.data.status == "success") {
                        this.count.person = response.data.data;
                    } else {
                        console.log(this.data.message);
                    }
                });
            });
        },
        getCountMemberPending() {
            Axios.get(
                "group/get_count_pending?group_id=" + this.$route.params.groupId
            ).then((response) => {
                if (response.data.status == "success") {
                    this.count.pending = response.data.data;
                } else {
                    console.log(this.data.message);
                }
            });
        },

        getList(page) {
            var url = "post/get_list_post_browse?group_id=24" + "&page=" + page;
            Axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.listPost = response.data.data;
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
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
    width: 80%;
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
