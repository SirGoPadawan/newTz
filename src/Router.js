import Vue from "vue";
import VueRouter from "vue-router";

import TheNotes from "./components/pages/TheNotes.vue";
import TheAboutNote from "./components/pages/TheAboutNote.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: TheNotes,
    },
    {
      path: "/note/:id",
      component: TheAboutNote,
    },
  ],
});

export default router;
