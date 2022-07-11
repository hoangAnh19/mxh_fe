<template lang="html">
    <div class="body">
        <NavbarLeftAdmin />
        <div>Admin</div>
    </div>
</template>

<script lang="js">
import NavbarLeftAdmin from "@/components/admin/NavbarLeftAdmin.vue";


  export default  {
    name: 'Admin',
    props: [],
    components: {
        NavbarLeftAdmin,
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },

}
</script>

<style scoped lang="scss">
.body {
    position: relative;
    top: 80px;
    left: 0;
    right: 0;
    background: #f2f2f2;
    padding: 20px;
}
</style>
