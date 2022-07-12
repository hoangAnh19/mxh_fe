import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Friend from "../views/Friend.vue";
import Chat from "../views/Chat.vue";
import UpdateProfile from "../views/UpdateProfile.vue";
import Group from "../views/Group.vue";
import Groups from "../views/Groups.vue";
import Setting from "../views/Setting.vue";
import Profile from "../views/Profile.vue";
import Command from "../views/Command.vue";
import Post from "../views/Post.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ForgotPassword from "../components/auth/ForgotPassword.vue";
import ResetPasswordForm from "../components/auth/ResetPasswordForm.vue";
import CoreValue from "../views/CoreValue.vue";
import Admin from "../views/Admin.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/profile/update",
        name: "UpdateProfile",
        component: UpdateProfile,
    },
    {
        path: "/post/:postId",
        name: "Post",
        component: Post,
    },
    {
        path: "/chat",
        name: "Chat",
        component: Chat,
    },
    {
        path: "/friend",
        name: "Friend",
        component: Friend,
    },
    {
        path: "/profile/:userId",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/setting",
        name: "Setting",
        component: Setting,
    },
    {
        path: "/group",
        name: "Groups",
        component: Groups,
    },
    {
        path: "/group/:groupId",
        name: "Group",
        component: Group,
    },
    {
        path: "/command",
        name: "Command",
        component: Command,
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Register.vue"),
    },
    {
        path: "/resetPassword",
        name: "ResetPassword",
        component: ResetPassword,
    },
    {
        path: "/reset-password",
        name: "reset-password",
        component: ForgotPassword,
        meta: {
            auth: false,
        },
    },
    {
        path: "/reset-password/:token",
        name: "reset-password-form",
        component: ResetPasswordForm,
        meta: {
            auth: false,
        },
    },
    { component: CoreValue, path: "/CoreValue", name: "CoreValue" },
    { component: Admin, path: "/admin", name: "Admin" },
    {
        path: "/admin/managerUser",
        name: "ManagerUser",
        component: () => import("../components/admin/ManagerUser.vue"),
    },
    {
        path: "/admin/managerPost",
        name: "ManagerPost",
        component: () => import("../components/admin/ManagerPost.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
