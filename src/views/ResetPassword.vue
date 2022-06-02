<template>
    <div class="login">
        <div class="form">
            <img src="../assets/Logo-Network.jpg" alt="" />
            <h1 class="mt-4 fw-bold">Tìm tài khoản của bạn</h1>
            <FormResetPassword />
            <div style="min-height: 20px"></div>
            <Footer />
        </div>
        <CoverAuth />
    </div>
</template>

<script>
// @ is an alias to /src
import FormResetPassword from "@/components/auth/FormResetPassword.vue";
import Footer from "@/components/Footer.vue";
import CoverAuth from "@/components/auth/CoverAuth.vue";

export default {
    name: "ResetPassword",
    components: {
        FormResetPassword,
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
}
img {
    margin-left: 200px;
    width: 200px;
    object-fit: contain;
}
</style>
