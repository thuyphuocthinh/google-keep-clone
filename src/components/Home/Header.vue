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
            <div class="header-search">
              <span>
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Tìm kiếm"
              />
            </div>
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
              <span> P </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const isSiderFull = computed(() => store.state.sidebar.isSiderFull);
const showFullSider = () => store.dispatch("showFullSidebar");
const showIconSider = () => store.dispatch("showIconSidebar");

const handleShowHideSidebar = () => {
  if (isSiderFull) showIconSider();
  else showFullSider();
};
</script>

<style scoped>
.header-container {
  border-bottom: 1px solid rgb(214, 214, 214);
  padding: 10px 5px;
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

.header-search > input {
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
