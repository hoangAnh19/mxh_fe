<template>
    <div class="nav-left-home">
        <div class="link-component">
            <router-link
                class="d-flex link"
                :to="{ name: 'Profile', params: { userId: user.id } }"
            >
                <div class="avatar">
                    <img
                        v-if="user.avatar"
                        :src="'http://127.0.0.1:8000/tmp_images/' + user.avatar"
                    />
                    <img v-else src="@/assets/image/default-user-avatar.png" />
                </div>
                <div style="margin: auto 10px">
                    {{ user.first_name + " " + user.last_name }}
                </div>
            </router-link>
            <router-link class="d-flex link" :to="{ name: 'ListUser' }">
                <div class="div-icon">
                    <b-icon class="icon" icon="people-fill"></b-icon>
                </div>
                <div style="margin: auto 10px">Thành viên</div>
            </router-link>
            <router-link class="d-flex link" :to="{ name: 'Groups' }">
                <div class="div-icon">
                    <b-icon class="icon" icon="globe"></b-icon>
                </div>
                <div style="margin: auto 10px">Các phòng ban</div>
            </router-link>
            <router-link class="d-flex link" :to="{ name: 'CoreValue' }">
                <div class="div-icon">
                    <b-icon class="icon" icon="journal-check"></b-icon>
                </div>
                <div style="margin: auto 10px">
                    Giá trị cốt lõi doanh nghiệp
                </div>
            </router-link>
            <router-link class="d-flex link" :to="{ name: 'InfoCompany' }">
                <div class="div-icon">
                    <b-icon class="icon" icon="info-circle-fill"></b-icon>
                </div>
                <div style="margin: auto 10px">Tổng quan doanh nghiệp</div>
            </router-link>
            <router-link class="d-flex link" :to="{ name: 'Chat' }">
                <div class="div-icon">
                    <b-icon class="icon" icon="chat-right-dots-fill"></b-icon>
                </div>
                <div style="margin: auto 10px">Messages</div>
            </router-link>
        </div>
        <div class="shortcuts">
            <div class="title-shortcuts">Lối tắt nhanh</div>
            <div class="list_group">
                <div
                    v-for="item in listGroup.length < 3 ? listGroup.length : 3"
                    class="d-flex group_item"
                    :key="item"
                >
                    <div class="cover">
                        <img
                            v-if="listGroup[item - 1].cover"
                            :src="
                                'http://127.0.0.1:8000/tmp_images/' +
                                listGroup[item - 1].cover
                            "
                        />
                        <img
                            v-else
                            src="@/assets/image/default-user-avatar.png"
                        />
                    </div>
                    <div class="mx-2" style="flex: 1">
                        <router-link
                            :to="{
                                name: 'Group',
                                params: { groupId: listGroup[item - 1].id },
                            }"
                            class="link"
                        >
                            {{ listGroup[item - 1].name }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Axios from "@/components/Axios.js";
// import EventBus from "@/EventBus.js";

export default {
    name: "NavbarLeftHome",
    components: {},
    props: {
        user: Object,
    },
    async created() {
        await Axios.get("group/get_list_group?page=1")
            .then((response) => {
                if (response.data.status == "success") {
                    this.listGroup = response.data.group;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lại");
            });
    },
    data() {
        return {
            listGroup: [],
        };
    },
    methods: {},
    computed: {},
};
</script>
<style scoped lang="scss">
.avatar {
    display: flex;
}
.avatar img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: auto;
}
.div-icon .icon {
    width: 30px;
    height: 30px;
    margin: auto;
}
.group_item {
    margin-top: 20px;
}
.shortcuts {
    border-top: 1px solid #18191a;
    text-align: left;
}
.link {
    color: black;
    text-decoration: none;
    margin-bottom: 20px;
}
.nav-left-home {
    position: fixed;
    left: 0;
    top: 70px;
    padding: 30px 10px;
    margin-top: 10px;
    overflow: auto;
    width: 16.67%;
    height: calc(100vh - 80px);
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    background: aliceblue;
}
.nav-left-home:hover::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.nav-left-home::-webkit-scrollbar {
    width: 5px !important;
    background: #f2f2f2;
}
.nav-left-home:hover::-webkit-scrollbar-thumb {
    background: #646668;
    height: 100px;
    border-radius: 5px;
}
.title-shortcuts {
    padding: 10px 0;
    font-weight: 700;
}
.cover {
    display: flex;
}
.cover img {
    width: 50px;
    height: 50px;
    margin: auto;
    border-radius: 10px;
}
</style>
