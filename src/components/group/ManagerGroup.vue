<template>
  <div class="manager-group">
    <div class="name-group"> {{group.name}}</div>

    <div class="manager">

      <div class="title">Quản trị nhóm</div>
      <div class="list">
        <div class="item" v-on:click="changeComponent(1)">
              <b-icon icon="house"></b-icon>
          Trang chủ</div>
        <div class="item" v-on:click="changeComponent(2)">
          <img src="@/assets/icon/icon-request.svg" /> Yêu cầu tham gia
        </div>
        <div class="item" v-on:click="changeComponent(3)">
          <img src="@/assets/icon/icon-pending-posts.svg" /> Bài viết chờ duyệt
        </div>
        <div class="item" v-on:click="changeComponent(4)">
          <img src="@/assets/icon/icon-block.svg" /> Danh sách thành viên bị chặn
        </div>
        <div class="item" v-on:click="changeComponent(5)">
          <b-icon icon="gear" v-if="member.role === config.group.role.admin"></b-icon> Cài đặt nhóm
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventBus from "@/EventBus.js";
// import Axios from "@/components/Axios.js";
import config from "@/config";

export default {
  name: "ManagerGroup",
created() {
    // window.onbeforeunload = function(){
    //        if (validate.required)
    // }
},
  props: {
    group: Object,
    member: Object
  },
  data() {
    return {
      config: config,

    };
  },
  methods: {
    changeComponent(type) {
    EventBus.$emit("changeComponentGroupManager", type);

    }
  }
}
</script>
<style scoped lang="scss">
.manager-group {
  border-top: 2px solid #f2f2f2;
   background: white;
  padding: 16px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05), 0 0 2px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 80px;
  left: 0;
  width: 16.67%;
  bottom: 0;
  padding-top: 30px;
  text-align: left;
}
.name-group {
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 25px;
}
.title {
  margin-left: 10px;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 16px

}
.item {
  padding: 10px 0;
  cursor: pointer;
}
.list{
  padding-left:16px;
}
</style>
