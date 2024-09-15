<template>
  <div class="header-container">
    <div class="container-fluid">
      <header class="header">
        <div class="d-flex justify-content-between align-items-center">
          <div class="header-left">
            <div class="header-logo">
              <span @click="handleShowHideSidebar">
                <i class="fa-solid fa-bars"></i>
              </span>
              <a href="#">
                <img src="../../assets/images/logo.png" alt="Keep logo" />
                <span class="ms-2">Keep</span>
              </a>
            </div>
          </div>

          <div class="header-middle">
            <form class="header-search" @submit.prevent="handleSubmitSearch">
              <span>
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                ref="searchRef"
                type="search"
                name="keyword"
                id="keyword"
                placeholder="Tìm kiếm"
                @input="handleTypingSearch"
              />
            </form>
            <div class="header-tools">
              <span>
                <i class="fa-solid fa-gear"></i>
              </span>
              <span>
                <i class="fa-solid fa-rotate-right"></i>
              </span>
            </div>
          </div>

          <div class="header-right">
            <div class="header-tools">
              <span>
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <span>
                <i class="fa-solid fa-gear"></i>
              </span>
              <span>
                <i class="fa-solid fa-rotate-right"></i>
              </span>
            </div>
            <div class="header-account">
              <span>
                <i class="fa-solid fa-grip"></i>
              </span>
              <a-dropdown>
                <a-avatar>
                  <template #icon><UserOutlined /></template>
                </a-avatar>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <span> Hi, {{ userLogin.username }} </span>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">Profile</a>
                    </a-menu-item>
                    <a-menu-item>
                      <span @click="handleLogout">Logout</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  renderSlot,
  watch,
} from "vue";
import type { Ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { searchService } from "../../services/searchServices";
import { UserOutlined } from "@ant-design/icons-vue";
import Cookies from "js-cookie";
import { TOKEN } from "../../constants/index";

const store = useStore();
const router = useRouter();
const route = useRoute();
const isSiderFull = computed(() => store.state.sidebar.isSiderFull);
const searchRef = ref(null);
const idTimeOut: Ref<number> = ref(0);
const userLogin = store.state.user.userLogin;

const showFullSider = () => store.dispatch("sidebar/showFullSidebar");
const showIconSider = () => store.dispatch("sidebar/showIconSidebar");
const handleShowHideSidebar = () => {
  if (isSiderFull.value) showIconSider();
  else showFullSider();
};

const handleLogout = () => {
  Cookies.remove(TOKEN);
  router.push("/auth/login");
  store.dispatch("user/setUserLogoutAction");
};

const handleScroll = (e: Event) => {
  const scrollY = window.scrollY;
  const headerContainer = document.querySelector(".header-container");
  if (scrollY > 50) {
    headerContainer.classList.add("header-container-fixed");
  } else {
    headerContainer.classList.remove("header-container-fixed");
  }
};

const handleTypingSearch = (e: Event) => {
  const { name, value } = e.target;
  clearTimeout(idTimeOut.value);
  idTimeOut.value = setTimeout(() => {
    const result = searchService(value);
    router.push({ path: `/search`, query: { keyword: value } });
    store.dispatch("tasksModule/setTasksSearchAction", result);
  }, 500);
};

const handleSubmitSearch = (e: Event) => {
  const value: string = e.target.elements[0].value;
  const result = searchService(value);
  router.push({ path: `/search`, query: { keyword: value } });
  store.dispatch("tasksModule/setTasksSearchAction", result);
};

watch(
  () => route.path, // Watch the route's path specifically
  (newPath) => {
    if (!newPath.includes("/search") && searchRef.value) {
      searchRef.value.value = ""; // Reset the search input field when not on /search
    }
  }
);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.header-container {
  border-bottom: 1px solid rgb(214, 214, 214);
  transition: all 0.5s;
  background-color: #fff;
  padding: 10px 5px;
}

@keyframes slideDown {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}

.header-container-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
  animation: slideDown 0.5s forwards;
}

.header-container span {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #5f6368;
  font-size: 20px;
}

.header-left {
  width: 232px;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-logo > span > i {
  font-size: 18px;
}

.header-logo > span:hover {
  background-color: #e4e4e4;
}

.header-logo > a {
  display: flex;
  align-items: center;
}

.header-logo > a > img {
  width: 40px;
}

.header-logo > a > span {
  font-size: 22px;
  color: #5f6368;
  font-weight: 500;
}

.header-middle {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}

.header-search {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #f1f3f4;
  border-radius: 10px;
  padding: 0 10px;
}

.header-search span {
  width: 40px;
  height: 40px;
}

.header-search > span:hover {
  background-color: #e4e4e4;
}

.header-search input {
  flex: 1;
  height: 50px;
  /* height: 100%; */
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0 10px;
}

.header-search:focus-within {
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
}

.header-middle .header-tools {
  display: flex;
  align-items: center;
}

.header-middle span:hover {
  background-color: #e4e4e4;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 125px;
  color: #5f6368;
}

.header-right .header-tools {
  display: none;
}

.header-right span:hover {
  background-color: #e4e4e4;
}

.header-right .header-account {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-right .header-account span:last-child {
  background-color: #01579b;
  border-radius: 50%;
  color: #fff;
  width: 35px;
  height: 35px;
}

@media screen and (max-width: 650px) {
  .header-middle {
    display: none;
  }
  .header-right .header-tools {
    display: flex;
  }
}
</style>
