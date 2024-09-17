import { createWebHistory, createRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import HomeLayout from "../layouts/HomeLayout.vue";
import Homepage from "../pages/Home/Homepage.vue";
import Trashpage from "../pages/Trash/Trashpage.vue";
import Search from "../pages/Search/Search.vue";
import { PAGE} from "../constants";
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../helpers/getToken';

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
  const accessToken: string = getAccessToken();
  if(to.name === PAGE.LOGIN && accessToken || to.name === PAGE.REGISTER && accessToken) {
    return next({name: PAGE.HOMEPAGE});
  }
  if (to.name !== PAGE.LOGIN && !accessToken) {
    next({ name: PAGE.LOGIN });
    removeAccessToken();
    removeRefreshToken();
  } else next();
});
