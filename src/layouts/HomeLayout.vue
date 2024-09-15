<template>
  <Header />
  <ToolBar />
  <a-layout class="home-layout">
    <Sidebar />
    <a-layout-content
      class="home-content"
      :class="isSiderFull ? 'full' : 'icon'"
    >
      <div class="container">
        <!-- <slot></slot> -->
        <!-- I will change to router-view after that -->
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { inject, computed, ref } from "vue";
import type { Ref } from "vue";
import Header from "../components/Home/Header.vue";
import Sidebar from "../components/Home/Sidebar.vue";
import ToolBar from "../components/Home/ToolBar.vue";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import { TOKEN } from "../constants/index";
const store = useStore();
const isSiderFull = computed(() => store.state.sidebar.isSiderFull);
const token: Ref<string> = ref(Cookies.get(TOKEN));

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

.home-content {
  /* border: 1px solid black; */
}

.home-content.full {
  background-color: #fff !important;
  width: calc(100% - 280px) !important;
}

.home-content.icon {
  background-color: #fff !important;
  width: calc(100% - 75px) !important;
}
</style>
