<template>
  <Header />
  <ToolBar />
  <a-layout class="home-layout">
    <Sidebar />
    <a-layout-content class="home-content" :class="isSiderFull ? 'full' : 'icon'">
      <div class="container">
        <!-- <slot></slot> -->
        <!-- I will change to router-view after that -->
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, onUpdated } from "vue";
import { socket } from "../socket";
import { useStore } from "vuex";
import Header from "../components/Home/Header.vue";
import Sidebar from "../components/Home/Sidebar.vue";
import ToolBar from "../components/Home/ToolBar.vue";
import { toast } from "vue3-toastify";

const store = useStore();
const isSiderFull = computed(() => store.state.sidebar.isSiderFull);
const userLogin = store.state.user.userLogin;

onMounted(() => {
  socket.emit("registerUser", userLogin.id);
  socket.on("remind_event", (mesasge: any) => {
    toast.success(`Lời nhắc: ${mesasge} `, {
      autoClose: false,
    });
  });
});

onUpdated(() => {
  socket.emit("registerUser", userLogin.id);
});

onUnmounted(() => {
  socket.off("remind_event");
  socket.emit("stop_remind_event");
});
</script>

<style>
.home-layout {
  min-height: 90vh;
  background-color: #fff !important;
  padding-bottom: 20px;
}

.home-sider {
  min-height: 100% !important;
}

/* .home-content { */
/* border: 1px solid black; */
/* } */

.home-content.full {
  background-color: #fff !important;
  width: calc(100% - 280px) !important;
}

.home-content.icon {
  background-color: #fff !important;
  width: calc(100% - 75px) !important;
}
</style>
