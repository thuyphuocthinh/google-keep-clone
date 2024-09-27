<template>
  <div>
    <p>{{ task.title }}</p>
    <a-button type="primary">Open</a-button>
  </div>
</template>
<script setup lang="ts">
import "../../models/task";
</script>
<style scoped></style>
