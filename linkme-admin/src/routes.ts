import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/home/index.vue";

const routes = [
  {
    path: "/admin",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
