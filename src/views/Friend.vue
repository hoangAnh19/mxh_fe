<template>
  <div class="friend">
    <Header v-bind:user="user" />
    <NavbarLeftFriend />
    <div class="body">
      <ListFriend v-if="component == 1" />
      <FriendRequest v-if="component == 2" />
      <FriendSuggestions v-if="component == 3" />
      <Birthday v-if="component == 4" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import EventBus from "@/EventBus.js";
import NavbarLeftFriend from "@/components/friend/NavBarLeftFriend.vue";
import ListFriend from "@/components/friend/ListFriend.vue";
import FriendRequest from "@/components/friend/FriendRequest.vue";
import FriendSuggestions from "@/components/friend/FriendSuggestions.vue";
import Birthday from "@/components/friend/Birthday.vue";
export default {
  name: "Friend",
  mounted() {
    EventBus.$on("changeComponentFriend", (type) => {
      this.component = type;
    });
  },
  data() {
    return {
      ajaxLoadFriend: false,
      component: 1,
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {},
  components: {
    Header,
    NavbarLeftFriend,
    ListFriend,
    FriendRequest,
    FriendSuggestions,
    Birthday,
  },
};
</script>
<style scoped lang="scss">
.body {
  margin-top: 80px;
  padding: 10px;
  margin-left: 350px;
}
</style>
ừ
