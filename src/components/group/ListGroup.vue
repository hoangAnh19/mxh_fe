<template>
    <div class="list-group">
        <b-row>
            <b-col cols="3" v-for="group in groups" :key="group">
                <div class="mb-4 item">
                    <div class="cover">
                        <img
                            v-if="group.cover"
                            :src="
                                'http://127.0.0.1:8000/file_upload/' +
                                group.cover
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                        />
                    </div>
                    <div class="mx-4 my-3">
                        <router-link
                            :to="{
                                name: 'Group',
                                params: { groupId: group.id },
                            }"
                            class="user-name fw-bold"
                        >
                            {{ group.name }}
                        </router-link>
                        <div class="text-secondary">
                            <b-icon
                                v-if="group.type == config.group.type.private"
                                icon="lock"
                            ></b-icon>
                            <b-icon v-else icon="globe"></b-icon>
                            &nbsp;
                            {{ group.count_member }} thành viên
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
// @ is an alias to /src
import config from "@/config";
// import Axios from "@/components/Axios.js";
// import EventBus from "@/EventBus.js";
export default {
    name: "ListMember",
    props: {
        groups: Object,
    },
    created() {},
    data() {
        return {
            config: config,
        };
    },
    watch: {},
    computed: {},
    methods: {},
    components: {},
};
</script>
<style scoped lang="scss">
.cover {
    position: relative;
}
.cover img {
    width: 100%;
    height: 180px;
    border-radius: 10px 10px 0 0;

    left: 0;
}
.item {
    border-radius: 10px;
    background-color: white;
    padding: 0;
}
.list-group {
    width: 90%;
    padding-top: 10px;
    text-align: left;
}
.user-name {
    color: black;
    text-decoration: none;
}
</style>
