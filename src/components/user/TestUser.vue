<template>
    <lightgallery
        :settings="{ speed: 500, plugins: plugins }"
        :onInit="onInit"
        :onBeforeSlide="onBeforeSlide"
    >
        <a
            data-lg-size="1406-1390"
            class="gallery-item"
            data-src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80"
        >
            <img
                class="img-responsive"
                src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            />
        </a>

        <a
            class="gallery-item"
            data-video='{"source": [{"src":"https://www.lightgalleryjs.com/videos/video1.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}'
            data-poster=""
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
        >
            <img
                width="200"
                class="img-responsive"
                src="https://www.lightgalleryjs.com/images/demo/html5-video-poster.jpg"
            />
        </a>

        <a
            class="gallery-item"
            data-video='{"source": [{"src":"http://127.0.0.1:8000/file_upload/1660068395.mp4"", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}'
        >
            <img
                width="200"
                class="img-responsive"
                src="https://www.lightgalleryjs.com/images/demo/html5-video-poster.jpg"
            />
        </a>
    </lightgallery>
</template>

<script>
import Lightgallery from "lightgallery/vue";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";

export default {
    name: "TestUser",
    components: {
        Lightgallery,
    },
    data() {
        return {
            plugins: [lgZoom, lgVideo],
        };
    },
    methods: {
        onInit: () => {
            console.log("lightGallery has been initialized");
        },
        onBeforeSlide: () => {
            console.log("calling before slide");
        },
    },
};
</script>
<style lang="css">
body {
    margin: 0;
}
.gallery-item {
    margin: 5px;
}
</style>
