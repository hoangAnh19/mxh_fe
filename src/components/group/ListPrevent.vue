<template>
  <b-col cols="8" offset="2" class="introduce-group">
    <div class="serch block my-3 fw-bold">
      <span>{{ count }} yêu cầu</span>
    </div>
    <div class="admin block my-3">
      <div class="mb-2">Danh sách chặn</div>
      <Member
        class="mb-4"
        v-for="mem in listPrevent"
        :key="mem"
        :role="mem.role"
        :status="mem.status"
        :isManager="true"
        :user="mem.user"
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
  name: "ListPrevent",
  props: {
    member: Object,
    count: Object,
  },
  created() {
    EventBus.$on("deleteMember", (id) => {
      this.listPrevent.forEach((man, index, object) => {
        if (man.user_id === id) {
          object.splice(index, 1);
        }
      });
    });

    Axios.get("group/get_list_prevent?group_id=" + this.$route.params.groupId)
      .then((response) => {
        if (response.data.status == "success") {
          this.listPrevent = response.data.data.list;
          this.countPending = response.data.data.count;
        } else {
          console.log(this.data.message);
        }
      })
      .catch(() => {
        alert("Đã có lỗi xảy ra, vui lòng thử lại");
      });
  },
  data() {
    return {
      config: config,
      listPrevent: {},
      user: {},
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
