import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import vClickOutside from "click-outside-vue3";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
router.beforeEach((to, from, next) => {
    const token = window.localStorage.getItem("token");
    axios
        .get("http://127.0.0.1:80/api/userInfo", {
            headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            if (
                to.name === "Login" ||
                to.name === "Register" ||
                to.name === "ResetPassword"
            )
                next("/");
            else next();
        })
        .catch(() => {
            localStorage.removeItem("token");
            if (
                to.name === "Login" ||
                to.name === "Register" ||
                to.name === "ResetPassword"
            )
                next();
            else next("/login");
        });
});
createApp(App)
    .use(vClickOutside)
    .use(store)
    .use(router)
    .use(BootstrapVue3)
    .mount("#app");
