<template>
  <a-layout-sider class="home-sider" :class="isSiderFull ? 'full' : 'icon'">
    <div v-if="isSiderFull" class="full-sider">
      <ul class="sider-list">
        <li class="sider-item">
          <a href="#" class="sider-link active">
            <span class="sider-icon">
              <i class="fa-regular fa-lightbulb"></i>
            </span>
            <span class="sider-title"> Ghi chú </span>
          </a>
        </li>
        <li class="sider-item">
          <a href="#" class="sider-link">
            <span class="sider-icon">
              <i class="fa-regular fa-bell"></i>
            </span>
            <span class="sider-title"> Lời nhắc </span>
          </a>
        </li>
        <li class="sider-item">
          <a href="#" class="sider-link">
            <span class="sider-icon">
              <i class="fa-solid fa-pen"></i>
            </span>
            <span class="sider-title"> Chỉnh sửa nhãn </span>
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
          <a href="#" class="sider-link">
            <span class="sider-icon">
              <i class="fa-solid fa-trash"></i>
            </span>
            <span class="sider-title"> Thùng rác </span>
          </a>
        </li>
      </ul>
    </div>

    <div v-else="isSiderFull" class="icon-sider">
      <ul class="sider-list">
        <li class="sider-item">
          <a href="#" class="sider-link active">
            <span class="sider-icon">
              <i class="fa-regular fa-lightbulb"></i>
            </span>
          </a>
        </li>
        <li class="sider-item">
          <a href="#" class="sider-link">
            <span class="sider-icon">
              <i class="fa-regular fa-bell"></i>
            </span>
          </a>
        </li>
        <li class="sider-item">
          <a href="#" class="sider-link">
            <span class="sider-icon">
              <i class="fa-solid fa-pen"></i>
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
          <a href="#" class="sider-link">
            <span class="sider-icon">
              <i class="fa-solid fa-trash"></i>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  provide,
  inject,
  computed,
} from "vue";
import type { Ref, InjectionKey } from "vue";
import { mapState, useStore } from "vuex";
const store = useStore();

const isSiderFull = computed(() => store.state.sidebar.isSiderFull);
const showFullSider = () => store.dispatch("showFullSidebar");
const showIconSider = () => store.dispatch("showIconSidebar");

const handleMouseMove = (e) => {
  const { screenX } = e;
  if (screenX > 0 && screenX < 75) {
    showFullSider();
  }
  if (isSiderFull) {
    if (screenX > 270) {
      showIconSider();
    }
  }
};

onMounted(() => {
  if (!isSiderFull) {
    window.addEventListener("mousemove", handleMouseMove);
  }
});

onUpdated(() => {
  if (!isSiderFull) {
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
  flex: 0 0 75px !important;
  min-width: 75px !important;
  max-width: none !important;
  width: 75px !important;
  background-color: #fff !important;
}

.home-content.icon {
  background-color: #fff !important;
  width: calc(100% - 75px) !important;
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
  width: 55px;
  font-size: 20px;
  text-align: center;
}

.sider-link > .sider-text {
  flex: 1;
}
</style>
