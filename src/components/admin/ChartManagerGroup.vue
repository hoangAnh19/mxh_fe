<template>
    <NavbarLeftAdmin />
    <div class="container" style="margin-left: 200px; max-width: 850px">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Quản lý <b>Phòng ban</b></h2>
                    </div>
                </div>
            </div>
            <!-- {{ postObject }} -->
            <h1>Bieu do</h1>
            <canvas id="myChartBar" width="400" height="400"></canvas>
            <canvas id="myChartPie" width="400" height="400"></canvas>
            <canvas id="myChartLine" width="400" height="400"></canvas>
            <canvas id="examChart"></canvas>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NavbarLeftAdmin from "@/components/admin/NavbarLeftAdmin.vue";
import Chart from "chart.js/auto";

export default {
    name: "ManagerPost",
    components: { NavbarLeftAdmin },

    mounted() {
        console.log("component mouted");

        const ctxPie = document.getElementById("myChartPie").getContext("2d");
        const dataPie = {
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
                {
                    label: "My First Dataset",
                    data: [300, 50, 100],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                    ],
                    hoverOffset: 4,
                },
            ],
        };
        const myChartPie = new Chart(ctxPie, {
            type: "doughnut",
            data: dataPie,
        });

        myChartPie;

        const ctxBar = document.getElementById("myChartBar").getContext("2d");
        const labelsBar = [
            "Red",
            "Blue",
            "Yellow",
            "Green",
            "Purple",
            "Orange",
        ];
        const dataBar = {
            labels: labelsBar,
            datasets: [
                {
                    label: "My First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
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
                    label: "My First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [
                        "rgba(255, 99, 136, 0.5)",
                        "rgba(255, 159, 64, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(201, 203, 207, 0.5)",
                    ],
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
        const myChartBar = new Chart(ctxBar, {
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

        myChartBar;

        var ctx = document.getElementById("examChart").getContext("2d");

        var myChart = new Chart(ctx, {
            type: "line",
            options: {
                scales: {
                    xAxes: [
                        {
                            type: "time",
                        },
                    ],
                },
            },
            data: {
                labels: [
                    "2015-03-15T13:03:00Z",
                    "2015-03-25T13:02:00Z",
                    "2015-04-25T14:12:00Z",
                ],
                datasets: [
                    {
                        label: "Demo",
                        data: [
                            {
                                t: "2015-03-15T13:03:00Z",
                                y: 12,
                            },
                            {
                                t: "2015-03-25T13:02:00Z",
                                y: 21,
                            },
                            {
                                t: "2015-04-25T14:12:00Z",
                                y: 32,
                            },
                        ],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        });

        myChart;
    },

    data() {
        return {};
    },
    methods: {},
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
