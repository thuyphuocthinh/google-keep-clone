import { createWebHistory, createRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import HomeLayout from "../layouts/HomeLayout.vue";
import Homepage from "../pages/Home/Homepage.vue";
import Trashpage from "../pages/Trash/Trashpage.vue";
import Search from "../pages/Search/Search.vue";
import { PAGE, TOKEN } from "../constants";
import { authService } from "../services/authService";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";

const routes = [
  {
    path: "/",
    component: HomeLayout,
    children: [
      {
        path: "",
        name: PAGE.HOMEPAGE,
        component: Homepage,
      },
      {
        path: "trash",
        name: PAGE.TRASH,
        component: Trashpage,
      },
      {
        path: "search",
        name: PAGE.SEARCH,
        component: Search,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    redirect: { name: PAGE.LOGIN }, // Redirect to the named 'login' route
    children: [
      {
        path: "login",
        name: PAGE.LOGIN, // Add a name to the route
        component: Login,
      },
      {
        path: "register",
        name: PAGE.REGISTER, // Add a name to the route
        component: Register,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: PAGE.NOTFOUND,
    component: Homepage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to: any, from: any, next: any) => {
  const token: string = Cookies.get(TOKEN);
  const result = await authService.verityToken(token);
  const isAuthenticated = result.data.success;
  if (
    (to.name === PAGE.LOGIN && isAuthenticated) ||
    (to.name === PAGE.REGISTER && isAuthenticated)
  ) {
    next({ name: PAGE.HOMEPAGE });
    return;
  }
  if (to.name === PAGE.NOTFOUND) {
    if (isAuthenticated) next({ name: PAGE.HOMEPAGE });
    else {
      next({ name: PAGE.LOGIN });
      Cookies.remove(TOKEN);
    }
  }
  if (to.name !== PAGE.LOGIN && !isAuthenticated) {
    next({ name: PAGE.LOGIN });
    Cookies.remove(TOKEN);
    setTimeout(() => {
      toast.error(
        "Token is invalid or not provided. Please, log in to continue."
      );
    }, 100);
  } else next();
});
