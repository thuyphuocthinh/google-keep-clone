<template>
  <div class="task-item" draggable="true">
    <div @click="getTaskDetail(task.id)">
      <div class="task-header">{{ task.title }}</div>
      <div class="task-deadline">
        <span>
          <i class="fa-regular fa-clock"></i>
        </span>
        <span> {{ task.deadline }} </span>
      </div>
      <div class="task-content">
        {{ task.content }}
      </div>
    </div>
    <div class="task-widgets">
      <TaskWidgets :id="task.id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Task } from "../../models/task";
import TaskWidgets from "./TaskWidgets.vue";
import TaskDetail from "./TaskDetail.vue";
import { useStore } from "vuex";
import { getTaskDetailService } from "../../services/taskServices";

const store = useStore();

const props = defineProps<{
  task: Task;
}>();

const getTaskDetail = (id: number) => {
  const taskDetail = getTaskDetailService(id);
  store.dispatch("tasksModule/setTaskDetailAction", taskDetail);
  store.dispatch("modal/openModalAction", TaskDetail);
};

</script>

<style>
.task-item {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

.task-item:hover {
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.task-item .task-header {
  font-weight: 500;
  font-size: 16px;
}

.task-item .task-content {
  font-size: 16px;
  padding: 10px 0;
  flex: 1;
  font-weight: 200;
  max-height: 300px;
  overflow-y: hidden;
}

.task-item .task-deadline {
  display: flex;
  font-size: 12px;
  gap: 5px;
}

.task-widgets {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
