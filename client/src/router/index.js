import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/lobby/:lobbyId/:userName",
    name: "Party",
    component: () => import("../views/Party.vue"),
    props: true
  },
  {
    path: "/lobby/:lobbyId",
    name: "Naam nodig",
    component: () => import("../views/NameNeeded.vue")
  },
  {
    path: "*",
    component: () => import("../views/Home.vue")
  }
  // {
  //   path: "/lobby/:lobbyId/pietjesbak",
  //   name: "Pietjesbak",
  //   component: Pietjesbak
  // }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
