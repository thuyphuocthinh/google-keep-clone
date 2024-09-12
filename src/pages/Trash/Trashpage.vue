<template>
  <div class="trash my-4">
    <div class="trash-container">
      <div class="container">
        <h6 class="mb-4"> ^ _ ^ Ghi chú trong thùng sẽ bị xóa sau 7 ngày ^ _ ^</h6>
        <div class="row">
          <div
            v-for="task in tasksDeleted"
            :key="task.id"
            class="col-md-3 mb-4"
          >
            <TaskItem :task="task" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import TaskItem from "../../components/Home/TaskItem.vue";
const store = useStore();

const tasksDeleted = computed(
  () => store.getters["tasksModule/getTasksDeleted"]
);

onMounted(() => {
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", "[]");
  }
  const tasksStorage = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (tasksStorage.length > 0) {
    store.dispatch("tasksModule/setTasksAction", tasksStorage);
  }
});
</script>

<style scoped>
h6 {
  text-align: center;
  font-weight: 300;
  font-style: italic;
  font-size: 18px;
}
</style>
