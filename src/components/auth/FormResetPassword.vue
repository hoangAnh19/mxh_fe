<template>
    <div class="row">
        <b-col cols="8" offset="2">
            <div class="form-group label">
                <label for="resetPass" class="mt-4">
                    Vui lòng nhập địa chỉ email hoặc số điện thoại di động của
                    bạn để tìm kiếm tài khoản của bạn.</label
                >
                <input type="text" class="form-control mt-4" />
                <div class="btn btn-primary mt-4">Khôi phục mật khẩu</div>
                <div>
                    <router-link
                        :to="{ name: 'Login' }"
                        class="btn btn-outline-danger mt-4"
                        style="margin: auto"
                        >Đăng nhập
                    </router-link>
                </div>
            </div>
        </b-col>
    </div>
</template>
<script>
export default {
    name: "FormResetPassword",
};
</script>
<style lang="scss" scoped>
.label {
    min-height: 50px;
}
</style>
