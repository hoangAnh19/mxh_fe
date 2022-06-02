<template>
    <div class="profile"></div>
</template>

<script>
// @ is an alias to /src

import Axios from "@/components/Axios.js";

export default {
    name: "Profile",

    async created() {
        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
        var index = 1;
        while (index < 2) {
            var id = 1;
            await Axios.post("login", {
                password: "hieuhala1272",
                email_or_phone: "test" + (index + 2) + "@gmail.com",
            }).then((response) => {
                localStorage.setItem("token", response.data.access_token);
            });
            await sleep(200);
            while (id < 90) {
                console.log("index", index, "id", id);
                var ran1 = Math.random();
                var ran2 = Math.random();
                if (ran1 < 0.5) {
                    Axios.post("relationship/request_friend", {
                        user_id: id,
                    }).then((response) => {
                        console.log(response);
                    });
                }
                if (ran2 < 0.5) {
                    Axios.post("relationship/follow", {
                        user_id: id,
                    }).then((response) => {
                        console.log(response);
                    });
                }
                await sleep(200);
                id++;
            }
            index++;
        }
    },
};
</script>
