import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./routes/index";
import store from "./store/index";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Vue3Toastify, {
  autoClose: 3000,
  // ...
} as ToastContainerOptions);
app.mount("#app");
