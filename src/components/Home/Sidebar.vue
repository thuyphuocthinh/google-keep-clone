<template>
  <a-layout-sider class="home-sider" :class="isSiderFull ? 'full' : 'icon'">
    <!-- full sider -->
    <div v-if="isSiderFull" class="full-sider">
      <ul class="sider-list">
        <li class="sider-item">
          <router-link to="/" exact-active-class="active" class="sider-link">
            <span class="sider-icon">
              <i class="fa-regular fa-lightbulb"></i>
            </span>
            <span class="sider-title"> Ghi chú </span>
          </router-link>
        </li>
        <li class="sider-item">
          <router-link to="/reminder" exact-active-class="active" class="sider-link">
            <span class="sider-icon">
              <i class="fa-regular fa-bell"></i>
            </span>
            <span class="sider-title"> Lời nhắc </span>
          </router-link>
        </li>
        <li v-for="(label, index) in labels" :key="index" class="sider-item">
          <router-link
            :to="`/labels/${label._id}`"
            exact-active-class="active"
            class="sider-link"
          >
            <span class="sider-icon">
              <i class="fa-solid fa-tag"></i>
            </span>
            <span class="sider-title" style="font-weight: 300">
              {{ label.title }}
            </span>
          </router-link>
        </li>
        <li class="sider-item">
          <a href="#" class="sider-link" @click="openLabelModal">
            <span class="sider-icon">
              <i class="fa-solid fa-pen-to-square"></i>
            </span>
            <span class="sider-title"> Quản lí nhãn </span>
          </a>
        </li>
        <li class="sider-item">
          <a href="#" class="sider-link">
            <span class="sider-icon">
              <i class="fa-solid fa-download"></i>
            </span>
            <span class="sider-title"> Lưu trữ </span>
          </a>
        </li>
        <li class="sider-item">
          <router-link to="/trash" exact-active-class="active" class="sider-link">
            <span class="sider-icon">
              <i class="fa-solid fa-trash"></i>
            </span>
            <span class="sider-title"> Thùng rác </span>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- icon sider -->
    <div v-else="isSiderFull" class="icon-sider">
      <ul class="sider-list">
        <li class="sider-item">
          <router-link to="/" exact-active-class="active" class="sider-link">
            <span class="sider-icon">
              <i class="fa-regular fa-lightbulb"></i>
            </span>
          </router-link>
        </li>
        <li class="sider-item">
          <router-link to="/reminder" exact-active-class="active" class="sider-link">
            <span class="sider-icon">
              <i class="fa-regular fa-bell"></i>
            </span>
          </router-link>
        </li>

        <li class="sider-item">
          <a href="#" class="sider-link" @click="openLabelModal">
            <span class="sider-icon">
              <i class="fa-solid fa-pen-to-square"></i>
            </span>
          </a>
        </li>
        <li class="sider-item">
          <a href="#" class="sider-link">
            <span class="sider-icon">
              <i class="fa-solid fa-download"></i>
            </span>
          </a>
        </li>
        <li class="sider-item">
          <router-link to="/trash" exact-active-class="active" class="sider-link">
            <span class="sider-icon">
              <i class="fa-solid fa-trash"></i>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, computed } from "vue";
import { useStore } from "vuex";
import Label from "../Label/Label.vue";
import * as labelsHelper from "../../helpers/labelHelper";

const store = useStore();
const isSiderFull = computed(() => store.state.sidebar.isSiderFull);
const canHover = computed(() => store.state.sidebar.canHover);
const labels = computed(() => store.getters["labels/getLabels"]);
const userLogin = store.state.user.userLogin;

// methods
const hoverSidebar = (value: any) =>
  store.dispatch("sidebar/hoverSidebar", {
    payload: value,
  });

const handleMouseMove = (e: MouseEvent) => {
  const { screenX, screenY } = e;
  if (canHover.value) {
    if (screenX > 0 && screenX < 75 && screenY > 200) {
      hoverSidebar(true);
    }
    if (screenX > 270) {
      hoverSidebar(false);
    }
  }
};

const openLabelModal = () => {
  store.dispatch("modal/openModalAction", Label);
};

// lifecycle hooks

onMounted(() => {
  if (canHover.value) {
    window.addEventListener("mousemove", handleMouseMove);
  }
  labelsHelper.getLabels(store, userLogin.id);
});

onUpdated(() => {
  if (canHover.value) {
    window.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  removeEventListener("mousemove", handleMouseMove);
});
</script>

<style>
.home-sider {
  min-height: 100% !important;
  margin-top: 80px;
}

.home-sider.full {
  flex: 0 0 280px !important;
  min-width: 280px !important;
  max-width: none !important;
  width: 280px !important;
  background-color: #fff !important;
}

.home-content.full {
  background-color: #fff !important;
  width: calc(100% - 280px) !important;
}

.home-sider.icon {
  flex: 0 0 85px !important;
  min-width: 85px !important;
  max-width: none !important;
  width: 85px !important;
  background-color: #fff !important;
}

.home-content.icon {
  background-color: #fff !important;
  width: calc(100% - 85px) !important;
}

.full-sider,
.icon-sider {
  margin-top: 10px;
}

.full-sider .sider-link {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  font-size: 14px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  font-weight: 500;
}

.icon-sider .sider-link {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  border-radius: 50%;
}

.sider-link:hover {
  background-color: #f5f5f5;
  color: #000;
}

.sider-link.active {
  background-color: #feefc3;
}

.sider-link > .sider-icon {
  width: 65px;
  font-size: 20px;
  text-align: center;
}

.sider-link > .sider-text {
  flex: 1;
}
</style>
