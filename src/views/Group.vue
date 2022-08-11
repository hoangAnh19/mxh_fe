<template>
    <div class="group">
        <Header v-bind:user="user" />
        <div class="body">
            <b-row>
                <b-col cols="2">
                    <ManagerGroup
                        v-if="
                            (member.role ?? null) === config.group.role.admin ||
                            (member.role ?? null) === config.group.role.censor
                        "
                        v-bind:group="group"
                        v-bind:member="member"
                    />
                </b-col>
                <b-col cols="8" v-if="componentManager == 1">
                    <b-row>
                        <b-col>
                            <GroupTop
                                v-bind:count="count"
                                v-bind:member_="member"
                                :group_="group"
                            />
                        </b-col>
                    </b-row>
                    <b-row class="time-line" v-if="component == 1">
                        <b-col cols="8">
                            <TimeLine
                                v-if="
                                    member.status == config.member.status.member
                                "
                                v-bind:group="group"
                                type_="group"
                            />
                            <div v-else>
                                Chào mừng bạn đã đến với group, hãy tham gia
                                group để có thể trao đổi với các thành viên
                                trong phòng/ban
                            </div>
                        </b-col>
                        <b-col cols="4">
                            <IntroGroup />
                        </b-col>
                    </b-row>
                    <b-row v-if="component == 2">
                        <IntroduceGroup
                            v-bind:count="count"
                            v-bind:group="group"
                        />
                    </b-row>
                    <b-row v-if="component == 3">
                        <ListMember
                            v-bind:count="count.person"
                            v-bind:member="member"
                        />
                    </b-row>
                    <b-row v-if="component == 4"> 4 </b-row>
                </b-col>
                <b-col v-if="componentManager == 2">
                    <ListPending
                        v-bind:count="count.pending"
                        v-bind:member="member"
                    />
                </b-col>
                <b-col v-if="componentManager == 3">
                    <ListPostBrowse v-bind:group_id="group.id" />
                </b-col>

                <b-col v-if="componentManager == 4">
                    <SettingGroup v-bind:group="group" />
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

import TimeLine from "@/components/post/TimeLine.vue";
import ListPostBrowse from "@/components/post/ListPostBrowse.vue";
import Header from "@/components/Header.vue";
import ManagerGroup from "@/components/group/ManagerGroup.vue";
import ListMember from "@/components/group/ListMember.vue";
import ListPending from "@/components/group/ListPending.vue";
import GroupTop from "@/components/group/GroupTop.vue";
import SettingGroup from "@/components/group/SettingGroup.vue";
import IntroduceGroup from "@/components/group/IntroduceGroup.vue";
import Axios from "@/components/Axios.js";
import config from "@/config";
import EventBus from "@/EventBus.js";

export default {
    name: "Group",

    async created() {
        await this.getGroupInfo(this.$route.params.groupId);
        await Axios.get("post/get_count?group_id=" + this.$route.params.groupId)
            .then((response) => {
                if (response.data.status == "success") {
                    this.count.post = response.data.data;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lại1");
            });
        await Axios.get(
            "group/get_count_member?group_id=" + this.$route.params.groupId
        )
            .then((response) => {
                if (response.data.status == "success") {
                    this.count.person = response.data.data;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lạ2i");
            });
        await Axios.get(
            "group/get_count_pending?group_id=" + this.$route.params.groupId
        )
            .then((response) => {
                if (response.data.status == "success") {
                    this.count.pending = response.data.data;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lại4");
            });
        await Axios.get(
            "group/get_count_prevent?group_id=" + this.$route.params.groupId
        )
            .then((response) => {
                if (response.data.status == "success") {
                    this.count.prevent = response.data.data;
                } else {
                    console.log(this.data.message);
                }
            })
            .catch(() => {
                alert("Đã có lỗi xảy ra, vui lòng thử lại7");
            });
        this.user = JSON.parse(localStorage.getItem("userInfo"));
        EventBus.$on("changeComponentGroupManager", (type) => {
            this.componentManager = type;
        });
        EventBus.$on("updateGroup", (group) => {
            this.group = group;
            this.componentManager = 1;
            this.component = 1;
        });
        EventBus.$on("infoMember", (member) => {
            this.member = member;
        });
        EventBus.$on("changeComponentGroup", (index) => {
            this.component = index;
        });
    },
    mounted() {},
    data() {
        return {
            config: config,
            user: {},
            component: 1,
            group: {},
            member: {},
            componentManager: 1,
            count: {},
        };
    },

    methods: {
        getGroupInfo(id) {
            Axios.get("group?group_id=" + id)
                .then((response) => {
                    if (response.data.status == "success") {
                        this.group = response.data.group;
                        this.member = response.data.member ?? {};
                        EventBus.$emit("infoGroup", this.group);
                        EventBus.$emit("infoMember", this.member);
                    } else {
                        alert("Group không tồn tại");
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    alert("Đã có lỗi xảy ra, vui lòng thử lại sau7");
                });
        },
    },
    components: {
        Header,
        ManagerGroup,
        GroupTop,
        IntroduceGroup,
        ListMember,
        ListPending,
        SettingGroup,
        TimeLine,
        ListPostBrowse,
    },
};
</script>
<style scoped lang="scss">
.body {
    position: relative;
    margin-top: 80px;
}
.time-line {
    margin: 20px;
}
</style>
