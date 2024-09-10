import { createWebHistory, createRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import HomeLayout from "../layouts/HomeLayout.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: HomeLayout,
  },
  {
    path: "/auth",
    component: AuthLayout,
    redirect: { name: "login" }, // Redirect to the named 'login' route
    children: [
      {
        path: "login",
        name: "login", // Add a name to the route
        component: Login,
      },
      {
        path: "register",
        name: "register", // Add a name to the route
        component: Register,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
