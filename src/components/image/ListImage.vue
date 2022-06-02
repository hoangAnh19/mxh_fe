<template>
  <b-row class="list_image">
    <b-col v-for="image in list_image" :key="image" class="col-image" cols="2">
          <div class="image" :style="{backgroundImage:'url(http://127.0.0.1:8000/tmp_images/' + image.src + ')'}" v-on:click="$router.push({ name: 'Post', params:{postId: image.link}})">
        </div>
    </b-col>
  </b-row>
</template>
<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";

export default {
  name: "ListImage",
  created() {
    this.isOwner =
      JSON.parse(localStorage.getItem("userInfo")).id == this.userId
        ? true
        : false;
    this.getListImage({
      user_id: this.user.id,
      page: 1,
    });
  },
  data() {
    return {
      isOwner: false,
      list_image: [],
    };
  },
  methods: {
    getListImage(option) {
      var url = "image/list?get_image=1&page=" + option.page;
      if (option.user_id) url += "&user_id=" + option.user_id;

      Axios.get(url)
        .then((response) => {
          if (response.data.status == "success") {
            var data = response.data.data;
            data.forEach((item) => {
              var imgs = JSON.parse(item.src_images)
              imgs.forEach((img) => {
                 this.list_image.push({
                  src: img,
                  link: item.id
                })
              })
            });
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
    user: Object,
  },
  watch: {},
};
</script>
<style scoped lang="scss">
.friend {
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.05) !important;
  text-align: left;
  padding: 20px;
}
.list_image {
  background-color: white;
  padding: 10px 0;
  border-radius: 10px;
}
.data {
  margin-top: 15px;
  padding: 20px;
  border-top: 1px solid rgb(172, 148, 148);
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

.image {
  max-height: 100%;
  width: 100%;
  height: 160px;
  background-size: cover;
  flex: 1 0 100%;
  display: flex;
}
.col-image{
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05), 0 0 2px rgba(0, 0, 0, 0.05);
  padding: 10px;
}
</style>
