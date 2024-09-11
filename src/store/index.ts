import { createStore } from "vuex";
import sidebar from "./modules/sidebar";
import tasksModule from "./modules/tasks";
import modal from "./modules/modal";

export default createStore({
  modules: {
    sidebar,
    tasksModule: tasksModule,
    modal,
  },
});
