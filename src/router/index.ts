import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";
import Login from "../components/Login.vue"
import Editor from "../components/Editor.vue";
import Register from "../components/Register.vue";
import NotFound from "../components/NotFound.vue";

const path = import.meta.env.VITE_SERVER_URL ?? ""

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/:user/:noteId?",
    component: Editor,
    props: (route: RouteLocationNormalized) => ({ user: route.params.user, noteId: route.params.noteId })
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(path),
  routes,
  scrollBehavior: (_, __, savedPosition) => {
    if (savedPosition) return savedPosition
    else return { top: 0 }
  }
})

export default router;