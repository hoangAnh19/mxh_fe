<template>
  <div class="home">
    <Header v-bind:user="user"/>
    <div class="body">
      <b-row>
        <b-col cols=2>
          <NavbarLeftHome v-bind:user="user"/>
        </b-col>
        <b-col offset=1 cols=6>
          <b-row>
            <b-col cols=10 offset=1>
              <TimeLine v-bind:user="user" type_="home" />

            </b-col>
          </b-row>

        </b-col>
        <b-col cols=2 offset=1>

        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLine from "@/components/profile/time-line/TimeLine.vue";
import NavbarLeftHome from "@/components/home/NavbarLeftHome.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  created() {
    this.user = JSON.parse(localStorage.getItem("userInfo"))
  },
  components: {
    Header,
    TimeLine,
    NavbarLeftHome,
  },

};
</script>
<style scoped lang="scss">
.body {
  position: relative;
  top: 80px;
  left:0;
  right:0;
background: #f2f2f2;
padding: 20px;
}
</style>
