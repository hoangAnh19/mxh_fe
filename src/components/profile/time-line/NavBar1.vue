<template>
    <div class="nav-left">
        <div class="row introduce">
            <div class="col-12 introduce-title p-4">Giới thiệu</div>

            <div class="item" v-if="education.length">
                <b-icon class="icon" icon="house-door"></b-icon>
                <span v-html="parseEducation(education)"></span>
            </div>
            <div class="item" v-if="workplace.length">
                <b-icon class="icon" icon="briefcase"></b-icon>
                <span v-html="parseWorkplace(workplace)"></span>
            </div>
            <div class="item">
                <b-icon class="icon" icon="clock"></b-icon>
                <span>
                    Tham gia NEU vào
                    {{ parseDate(user.created_at.slice(0, 10)) }}</span
                >
            </div>
            <div class="item" v-if="user.address">
                <b-icon class="icon" icon="house"></b-icon>
                <span> Sống tại {{ user.address }}</span>
            </div>
            <div class="item" v-if="countFollow">
                <b-icon class="icon" icon="rss"></b-icon>
                <span> Có {{ countFollow }} người theo dõi</span>
            </div>
        </div>
        <!-- <div class="row image">Image</div>
    <div class="row friend">Friend</div> -->
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
import parse from "@/parse";
export default {
    name: "NavBarLeftProfile",
    created() {
        this.reload();
    },
    props: {
        user: Object,
    },
    data() {
        return {
            education: [],
            workplace: [],
            countFollow: 0,
        };
    },
    watch: {
        user: function () {
            this.reload();
        },
    },
    methods: {
        reload() {
            Axios.get("relationship/count_followed?user_id=" + this.user.id)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.countFollow = response.data.data;
                    } else {
                        alert("Tài khoản không tồn tại");
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
                });
            var edu = JSON.parse(this.user.education)[0] ?? null;
            if (edu) {
                edu = Object.values(edu);
                var start = edu[2];
                edu[2] = (start.split("-")[1] ?? "").split("/")[0] ?? null;
                edu[3] = (start.split("-")[1] ?? "").split("/")[1] ?? null;
                edu[4] = (start.split("-")[0] ?? "").split("/")[0] ?? null;
                edu[5] = (start.split("-")[0] ?? "").split("/")[1] ?? null;
                this.education = edu;
            } else {
                this.education = [];
            }
            var work = JSON.parse(this.user.workplace)[0] ?? null;
            console.log(work);
            if (work) {
                work = Object.values(work);
                start = work[2];
                work[2] = (start.split("-")[1] ?? "").split("/")[0] ?? null;
                work[3] = (start.split("-")[1] ?? "").split("/")[1] ?? null;
                work[4] = (start.split("-")[0] ?? "").split("/")[0] ?? null;
                work[5] = (start.split("-")[0] ?? "").split("/")[1] ?? null;
                this.workplace = work;
            } else {
                this.workplace = [];
            }
        },

        parseEducation(education) {
            return parse.parseEducation(education, "short");
        },
        parseDate(date) {
            return parse.parseDate(date);
        },
        parseWorkplace(Workplace) {
            return parse.parseWorkplace(Workplace, "short");
        },
    },
};
</script>
<style scoped lang="scss">
.nav-left {
    background: white;
    position: sticky;
    top: 85px;
    padding: 0;
}
.introduce-title {
    text-align: left;
    font-size: 25px;
    font-weight: 700;
}
.item {
    text-align: left;
    padding: 10px;
    padding-left: 25px;
}
.icon {
    margin-right: 10px;
}
</style>
