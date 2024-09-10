<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-sider auth-item d-md-block d-none"></div>
      <div class="auth-form auth-item">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
.auth-layout {
  background: #fff;
  height: 100vh;
}

.auth-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.auth-sider {
  height: 100%;
  flex: 1 0 60%;
  background: url("../assets/images/keep.png") center center
    no-repeat;
  background-size: 400px;
  background-color: #b5deff;
}

.auth-form {
  width: 40%;
  height: 100%;
}

@media screen and (max-width: 780px) {
  .auth-form {
    width: 100%;
  }
}
</style>
