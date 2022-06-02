<template>
    <div class="login">
        <div class="form">
            <HeaderAuth />
            <FormLogin />
            <div style="min-height: 20px"></div>
            <Footer />
        </div>
        <CoverAuth />
    </div>
</template>

<script>
// @ is an alias to /src
import FormLogin from "@/components/auth/FormLogin.vue";
import HeaderAuth from "@/components/auth/HeaderAuth.vue";
import Footer from "@/components/Footer.vue";
import CoverAuth from "@/components/auth/CoverAuth.vue";

export default {
    name: "Login",
    components: {
        FormLogin,
        CoverAuth,
        Footer,
        HeaderAuth,
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
</style>
