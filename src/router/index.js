import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import Cookies from "js-cookie";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    children: [
      {
        path: ":localId",
        component: () => import("../views/Home.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authenticateduser = localStorage.getItem("user");
  const requireauth = to.matched.some((record) => record.meta.requireauth);

  if (requireauth && !authenticateduser) {
    next("/");
  } else {
    next();
  }
});

export default router;
