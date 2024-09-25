import { createWebHistory, createRouter } from "vue-router";
import AuthLayout from "../layouts/AuthLayout.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import HomeLayout from "../layouts/HomeLayout.vue";
import Homepage from "../pages/Home/Homepage.vue";
import Trashpage from "../pages/Trash/Trashpage.vue";
import Search from "../pages/Search/Search.vue";
import { PAGE} from "../constants";
import { getToken, removeToken } from "../helpers/getToken";
import Labelpage from "../pages/Label/Labelpage.vue";
import Reminder from "../pages/Reminder/Reminder.vue";

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
      {
        path: "labels/:labelId",
        name: PAGE.LABEL,
        component: Labelpage
      },
      {
        path: "reminder",
        name: PAGE.REMINDER,
        component: Reminder
      }
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
    redirect: {name: PAGE.HOMEPAGE}
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken: string = getToken();
  if (to.name === PAGE.LOGIN || to.name === PAGE.REGISTER) {
    if (accessToken) {
      return next({ name: PAGE.HOMEPAGE });
    } else {
      removeToken();
      return next(); 
    }
  }
  if (to.name !== PAGE.LOGIN && !accessToken && to.name !== PAGE.REGISTER) {
    removeToken(); 
    return next({ name: PAGE.LOGIN }); 
  }
  next();
});
