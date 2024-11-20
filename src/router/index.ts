import { createRouter, createWebHistory, RouteLocationNormalized } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Index from "../components/Index.vue";
import Login from "../components/Login.vue"
import Editor from "../components/Editor.vue";
import Register from "../components/Register.vue";

const path = import.meta.env.VITE_SERVER_URL ?? ""

const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/hello",
    component: HelloWorld
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/:user/editor/:noteId?",
    component: Editor,
    props: (route: RouteLocationNormalized) => ({ user: route.params.user, noteId: route.params.noteId })
  },
  {
    path: "/register",
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(path),
  routes
})

export default router;