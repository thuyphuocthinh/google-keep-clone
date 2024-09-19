import { createStore } from "vuex";
import sidebar from "./modules/sidebar";
import tasksModule from "./modules/tasks";
import modal from "./modules/modal";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";
import loading from "./modules/loading";
import labels from "./modules/labels";

const userState = createPersistedState({
  paths: ["user"],
  key: "user",
});

export default createStore({
  modules: {
    sidebar,
    tasksModule: tasksModule,
    modal,
    user,
    loading,
    labels
  },
  plugins: [userState],
});
