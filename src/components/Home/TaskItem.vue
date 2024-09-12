<template>
  <div class="task-item" draggable="true" ref="taskItemRef">
    <span class="task-item-check" @click="handleSelectItem">
      <i class="fa-solid fa-check"></i>
    </span>
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
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
const store = useStore();
const props = defineProps<{
  task: Task;
}>();
const taskItemRef = ref(null);

const getTaskDetail = (id: number) => {
  const taskDetail = getTaskDetailService(id);
  store.dispatch("tasksModule/setTaskDetailAction", taskDetail);
  store.dispatch("modal/openModalAction", TaskDetail);
};

const handleSelectItem = () => {
  taskItemRef.value.classList.toggle("selected");
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
  position: relative;
}

.task-item.selected {
  border: 2px solid #000;
}

.task-item-check {
  position: absolute;
  background-color: #000;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -6px;
  left: -6px;
  cursor: pointer;
  display: none;
}

.task-item:hover {
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
}

.task-item:hover .task-item-check {
  display: flex;
}

.task-item.task-item.selected .task-item-check {
  display: flex;
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
