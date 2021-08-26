import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Tasks from "../views/Tasks.vue";

const routes = [
  {
    // Routes pré-chargées.
    // Le composant propre à Home est loadé tout de suite.
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    // Routes pré-chargées :
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
  },
  {
    // Route chargée en lazy-loaded donc qui charge le composant qu'au moment où on clique dessus.
    // Ce n'est qu'au moment où on clique sur about que le code propre va être chargé.
    // Ici on bénéficie des import asynchrones :
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
