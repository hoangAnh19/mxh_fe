<template>
    <div class="login">
        <div class="form">
            <img src="../assets/Logo-Network.jpg" alt="" />
            <h1 class="mt-2 fw-bold">Đăng kí tài khoản</h1>
            <FormRegister />
            <div style="min-height: 20px"></div>
            <Footer />
        </div>
        <CoverAuth />
    </div>
</template>

<script>
// @ is an alias to /src
import FormRegister from "@/components/auth/FormRegister.vue";
import Footer from "@/components/Footer.vue";
import CoverAuth from "@/components/auth/CoverAuth.vue";

export default {
    name: "Register",
    components: {
        FormRegister,
        CoverAuth,
        Footer,
    },
};
</script>
<style scoped lang="scss">
.login {
    width: 100vw;
    display: flex;
}
.form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}
img {
    margin-left: 200px;
    width: 200px;
    object-fit: contain;
}
</style>
