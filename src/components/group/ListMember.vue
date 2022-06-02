<template>
    <b-col cols="8" offset="2" class="introduce-group">
        <div class="serch block my-3 fw-bold">
            <span>{{ count }} thành viên</span>
            <input class="form-control" placeholder="Tìm kiếm tại đây" />
        </div>
        <div v-if="member.id" class="you block my-3">
            <Member
                v-bind:role="member.role"
                v-bind:isManager="isManager"
                v-bind:user="member.user"
            />
        </div>
        <div class="admin block my-3">
            <div class="mb-2">
                Quản trị viên & người kiểm duyệt <b-icon icon="dot"></b-icon>
                {{ countManager }}
            </div>
            <Member
                class="mb-4"
                v-for="mem in listManager"
                :key="mem"
                :status="mem.status"
                v-bind:role="mem.role"
                v-bind:isManager="isManager"
                v-bind:user="mem.user"
            />
        </div>
        <div class="admin block my-3">
            <div class="mb-2">Tất cả thành viên</div>
            <Member
                class="mb-4"
                v-for="mem in listMember"
                :key="mem"
                v-bind:role="mem.role"
                v-bind:isManager="isManager"
                v-bind:user="mem.user"
            />
        </div>
    </b-col>
</template>
<script>
// @ is an alias to /src
import config from "@/config";
import Member from "@/components/group/Member.vue";
import Axios from "@/components/Axios.js";
import EventBus from "@/EventBus.js";
export default {
    name: "ListMember",
    props: {
        member: Object,
        count: Object,
    },
    created() {
        EventBus.$on("deleteMember", (id) => {
            this.listManager.forEach((man, index, object) => {
                if (man.user_id === id) {
                    object.splice(index, 1);
                }
            });
            this.listMember.forEach((man, index, object) => {
                if (man.user_id === id) {
                    object.splice(index, 1);
                }
            });
        });

        Axios.get(
            "group/get_list_manager?group_id=" + this.$route.params.groupId
        )
            .then((response) => {
                if (response.data.status == "success") {
                    this.listManager = response.data.data.list;
                    this.countManager = response.data.data.count;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            });
        Axios.get(
            "group/get_list_nomarl?group_id=" + this.$route.params.groupId
        )
            .then((response) => {
                if (response.data.status == "success") {
                    this.listMember = response.data.data.list;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            });
        this.isManager = this.member.role == 1 ? true : false;
    },
    data() {
        return {
            config: config,
            listManager: {},
            user: {},
            listMember: {},
            isManager: false,
        };
    },
    watch: {},
    computed: {},
    methods: {},
    components: {
        Member,
    },
};
</script>
<style scoped lang="scss">
.introduce-group {
    margin-top: 30px;
    background: white;
    border-radius: 10px;
    padding: 16px;
    text-align: left;
}
.title {
    font-weight: 700;
}
.content {
    margin-top: 20px;
    border-top: 2px solid #f2f2f2;
    padding: 10px 0;
}
.block {
    border-bottom: 2px solid #f2f2f2;
    padding-bottom: 20px;
}
.form-control {
    border-radius: 25px;
    margin-top: 10px;
}
</style>
