<template>
    <div class="header container">
        <div class="row">
            <div class="offset-1 col-10">
                <span class="h1">Enterprise Inside</span>
                <br />
                <img class="mt-4" src="@/assets/Logo-Network.jpg" />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: "HeaderAuth",
};
</script>
<style scoped lang="scss">
.header {
    padding: 30px 0;
}
img {
    width: 200px;
    object-fit: contain;
}
.h1 {
    font-size: 50px;
    font-weight: 700;
    color: #1877f2;
}
</style>
