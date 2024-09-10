<template>
  <Header />
  <a-layout class="home-layout">
    <Sidebar />
    <a-layout-content
      class="home-content"
      :class="isSiderFull ? 'full' : 'icon'"
    >
      Content
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { inject} from "vue";
import Header from "../components/Home/Header.vue";
import Sidebar from "../components/Home/Sidebar.vue";

</script>

<style>
.home-layout {
  min-height: 90vh;
  background-color: #fff !important;
}

.home-sider {
  min-height: 100% !important;
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
