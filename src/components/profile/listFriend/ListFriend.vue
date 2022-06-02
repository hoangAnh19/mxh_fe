<template>
  <b-col class="mt-4 bg-white friend" cols="8" offset="2">
    <div class="control">
      <div class="title"><b-icon icon="people"></b-icon> Bạn bè</div>
      <div v-on:click="isComponent = 'list_friend'" class="control-nav">
        Bạn bè
      </div>
      <div
        v-if="!isOwner"
        v-on:click="isComponent = 'list_mutual_friend'"
        class="control-nav"
      >
        Bạn chung
      </div>
      <div v-on:click="isComponent = 'list_followed'" class="control-nav">
        Người theo dõi
      </div>
      <div
        v-if="isOwner"
        v-on:click="isComponent = 'list_request_friend'"
        class="control-nav"
      >
        Đã gửi lời mời
      </div>
      <div
        v-if="isOwner"
        v-on:click="isComponent = 'list_request_friended'"
        class="control-nav"
      >
        Lời mời kết bạn
      </div>
      <div
        v-if="isOwner"
        v-on:click="isComponent = 'list_follow'"
        class="control-nav"
      >
        Người đang theo dõi
      </div>
      <div
        v-if="isOwner"
        v-on:click="isComponent = 'list_prevent'"
        class="control-nav"
      >
        Chặn
      </div>
    </div>
    <b-row class="data">
      <b-col
        cols="6"
        class="p-4 d-flex"
        v-for="(user, index) in list_user"
        :key="index"
      >
        <img
          v-if="user.avatar"
          :src="'http://127.0.0.1:8000/tmp_images/' + user.avatar"
          class="avatar"
        />
        <img
          class="avatar"
          v-else
          src="@/assets/image/default-user-avatar.png"
        />
        <div class="d-flex flex-column justify-content-center p-4">
          <router-link
            :to="{ name: 'Profile', params: { userId: user.id } }"
            class="pb-2 fw-bold text-decoration-none link-user"
          >
            {{ user.first_name + " " + user.last_name }}
          </router-link>
          <div v-if="user.count_mutual_friends">
            {{ user.count_mutual_friends + " bạn chung" }}
          </div>
        </div>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";

export default {
  name: "ListFriend",
  created() {
    this.isOwner =
      JSON.parse(localStorage.getItem("userInfo")).id == this.userId
        ? true
        : false;
    this.getListUser(this.isOwner ? null : this.userId, "list_friend");
  },
  data() {
    return {
      isOwner: false,
      isComponent: 1,
      list_user: [],
    };
  },
  methods: {
    getListUser(id = null, type) {
      var url;
      switch (type) {
        case "list_mutual_friend":
           url = "relationship/list_mutual_friend";
          break;
        case "list_friend":
          url = "relationship/list_friend";
          break;
        case "list_followed":
          url = "relationship/list_followed";
          break;
        case "list_follow":
          url = "relationship/list_follow";
          break;
        case "list_prevent":
          url = "relationship/list_prevent";
          break;
        case "list_request_friend":
          url = "relationship/list_request_friend";
          break;
        case "list_request_friended":
          url = "relationship/list_request_friended";
          break;
        default:
          url = "relationship/list_friend";
          break;
      }
      if (id) url += "?user_id=" + id;
      Axios.get(url)
        .then((response) => {
          if (response.data.status == "success") {
            var data = response.data.data;

            this.list_user = data;
          } else {
            alert(response.data.message);
            this.$router.push({ name: "Home" });
          }
        })
        .catch(() => {
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
        });
    },
  },
  props: {
    userId: Number,
  },
  watch: {
    isComponent: function (type) {
      this.getListUser(this.userId, type);
    },
  },
};
</script>
<style scoped lang="scss">
.friend {
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.05) !important;
  text-align: left;
  padding: 20px;
}
.data {
  margin-top: 15px;
  padding: 20px;
  border-top: 1px solid rgb(172, 148, 148);
}
.item {
  margin: 30px 0;
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
}
.control-nav {
  display: inline-block;
  padding: 10px 20px;
  font-weight: 600;
}
.link-user {
  cursor: pointer;
}
.avatar {
    width: 125px;
    height: 125px;
}
</style>
