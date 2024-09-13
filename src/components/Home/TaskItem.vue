<template>
  <div
    class="task-item"
    :class="tasksSelected.includes(task.id) ? 'selected' : ''"
    draggable="true"
    ref="taskItemRef"
  >
    <span :id="task.id" class="task-item-check" @click="handleSelectItem">
      <i :id="task.id" class="fa-solid fa-check"></i>
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
      <TaskWidgets v-if="!task.deleted" :id="task.id"> </TaskWidgets>
      <div v-if="!task.deleted" class="task-tools-right">
        <span @click="openDropdown" ref="openDropdownBtnRef">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </span>
        <div class="dropdown" v-if="isDropdownOpen" ref="dropdownRef">
          <ul class="dropdown-list">
            <a-popconfirm
              ref="popconfirmRef"
              title="Are you sure to delete this task？"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(task.id)"
              @cancel="cancel"
            >
              <li class="dropdown-item">
                <span class="sider-icon">
                  <i class="fa-solid fa-trash"></i>
                </span>
                Delete
              </li>
            </a-popconfirm>
          </ul>
        </div>
      </div>
      <TrashDelete v-if="task.deleted" :id="task.id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TaskWidgets from "./TaskWidgets.vue";
import TaskDetail from "./TaskDetail.vue";
import TrashDelete from "../Trash/TrashDelete.vue";
import { Task } from "../../models/task";
import { useStore } from "vuex";
import { getTaskDetailService } from "../../services/taskServices";
import { computed, onMounted, onUpdated, ref, onUnmounted } from "vue";
import type { Ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { deleteTaskService } from "../../services/taskServices";
import { toast } from "vue3-toastify";
const store = useStore();
const props = defineProps<{
  task: Task;
}>();
const taskItemRef = ref(null);
const tasksSelected = computed(
  () => store.getters["tasksModule/getTasksSelected"]
);
const isDropdownOpen: Ref<Boolean> = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const popconfirmRef = ref<HTMLElement | null>(null);
const openDropdownBtnRef = ref<HTMLElement | null>(null);

const getTaskDetail = (id: number) => {
  const taskDetail = getTaskDetailService(id);
  store.dispatch("tasksModule/setTaskDetailAction", taskDetail);
  store.dispatch("modal/openModalAction", TaskDetail);
};

const handleSelectItem = () => {
  store.dispatch("tasksModule/setTasksSelectedAction", props.task.id);
};

const openDropdown = () => {
  isDropdownOpen.value = true;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const confirm = (id: number) => {
  deleteTaskService(id);
  toast("Deleted task successfully", {
    theme: "colored",
    type: "success",
    dangerouslyHTMLString: false,
  });
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  store.dispatch("tasksModule/setTasksAction", tasksStorage);
};

const cancel = () => {
  closeDropdown();
};

const handleClickOutside = (event: MouseEvent) => {
  const dropdownElement = dropdownRef.value;
  const openDropdownBtnElement = openDropdownBtnRef.value;
  const popconfirmElement = popconfirmRef.value;
  if (
    dropdownElement &&
    !dropdownElement.contains(event.target as Node) &&
    event.target !== openDropdownBtnElement &&
    popconfirmElement &&
    event.target !== popconfirmElement
  ) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
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
