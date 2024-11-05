import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Index from "../components/Index.vue";
import Data from "../components/Data.vue";
import Login from "../components/Login.vue"

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
    path: "/data",
    component: Data
  },
  {
    path: "/login",
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;