import { createStore } from "vuex";
import sidebar from "./modules/sidebar";

export default createStore({
  modules: {
    sidebar,
  },
});
