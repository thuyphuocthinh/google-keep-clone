<template>
  <div class="search my-4">
    <div class="search-container">
      <div class="container">
        <h6 class="mb-4 text-center">Kết quả tìm kiếm</h6>
        <div v-if="tasksSearch.length > 0" class="row">
          <div
            v-for="task in tasksSearch"
            :key="task.id"
            class="col-lg-3 col-md-6 col-12 mb-4"
          >
            <TaskItem :task="task" />
          </div>
        </div>
        <div v-else>
          <p class="text-center">Không tìm thấy</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();

const tasksSearch = computed(() => store.getters["tasksModule/getTasksSearch"]);
</script>

<style></style>
