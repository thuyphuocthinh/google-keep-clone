<template>
  <div class="workspace">
    <div class="workspace-container">
      <div class="row mt-4">
        <div class="col-md-4 col-12 mb-md-0 mb-3">
          <div class="workspace-col">
            <h5>Todo</h5>
            <div class="col-content todo">
              <div v-for="task in tasksTodo" :key="task.id">
                <TaskItem :task="task" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12 mb-md-0 mb-3">
          <div class="workspace-col">
            <h5>In progress</h5>
            <div class="col-content progress">
              <div v-for="task in tasksProgress" :key="task.id">
                <TaskItem :task="task" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12 mb-md-0 mb-3">
          <div class="workspace-col">
            <h5>Done</h5>
            <div class="col-content done">
              <div v-for="task in tasksDone" :key="task.id">
                <TaskItem :task="task" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import TaskItem from "./TaskItem.vue";

// Access the store instance
const store = useStore();
const tasksTodo = computed(() => store.getters["tasksModule/getTasksTodo"]);
const tasksProgress = computed(
  () => store.getters["tasksModule/getTasksProgress"]
);
const tasksDone = computed(() => store.getters["tasksModule/getTasksDone"]);

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

<style>
.workspace {
}

.workspace-container {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
}

.col-content {
  border-radius: 10px;
  min-height: 300px;
  background-color: #f1f3f4;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.workspace-col h5 {
  text-align: center;
  margin-bottom: 10px;
  color: #555555;
  font-size: 17px;
}
</style>
