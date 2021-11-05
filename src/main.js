import Vue from "vue";
import VueRouter from "vue-router";
import VueCookie from "vue-cookie";

import App from "./App.vue";
import Home from "./views/Home.vue";
import Freets from "./views/Freets.vue";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
import Settings from "./views/Settings.vue";
import Profile from "./views/Profile.vue";

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueCookie);

export const router = new VueRouter({
  routes: [
    { path: "/", component: Home, props: true },
    { path: "/freets", component: Freets, props: true },
    { path: "/signin", component: SignIn, props: true },
    { path: "/signup", component: SignUp, props: true },
    { path: "/settings", component: Settings, props: true },
    { path: "/profile", component: Profile, props: true},
  ],
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
