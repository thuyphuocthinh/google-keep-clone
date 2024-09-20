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
    <div @click="getTaskDetail(task.id || '')">
      <div class="task-header">{{ task.title }}</div>
      <div class="task-content">
        {{ task.content }}
      </div>
      <div class="task-labels">
        <a-tag color="green" v-for="(label, index) in task.labelTitle" :key="index">
          {{ label }}
        </a-tag>
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
              @confirm="deleteTask(task.id || '', task.createdBy)"
              @cancel="cancel"
            >
              <li class="dropdown-item">
                <span class="sider-icon">
                  <i class="fa-solid fa-trash"></i>
                </span>
                Delete
              </li>
            </a-popconfirm>
            <li class="dropdown-item" @click="openLabelPopup">
              <span class="sider-icon">
                <i class="fa-solid fa-tag"></i>
              </span>
              Manage label
            </li>
          </ul>
        </div>
        <div v-if="showEditLabel" ref="labelPopupRef" class="label-popup">
          <div class="label-input">
            <input
              type="text"
              name="title"
              id="title"
              v-model="labelSearch"
              placeholder="Nhập tên nhãn..."
            />
            <span>
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
          <div class="label-list">
            <div v-for="(label, index) in labels" :key="index" class="label-item">
              <div
                class="form-check"
                v-if="label.title.toLowerCase().includes(labelSearch.toLowerCase())"
              >
                <input
                  type="checkbox"
                  name="check"
                  :id="label._id"
                  class="form-check-input"
                  :checked="task.label?.includes(label._id)"
                  @change="handleCheckLabel($event, label._id, task.id || '')"
                />
                <label :for="label._id" class="form-check-label">
                  {{ label.title }}
                </label>
              </div>
            </div>
          </div>
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
import { computed, onMounted, ref, onUnmounted } from "vue";
import type { Ref } from "vue";
import { taskServiceApi } from "../../services/myBackEnd/taskServicesApi";
import { STATUS_CODE } from "../../constants/index";
import * as tasksHelper from "../../helpers/tasksHelper";
import { onClickOutside } from "@vueuse/core";
import { toast } from "vue3-toastify";
// import { getTaskDetailService } from "../../services/myBackEnd/taskServices";
// import { deleteTaskService } from "../../services/taskServices";

const store = useStore();
const props = defineProps<{
  task: Task;
}>();
const taskItemRef = ref(null);
const tasksSelected = computed(() => store.getters["tasksModule/getTasksSelected"]);
const isDropdownOpen: Ref<Boolean> = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const popconfirmRef = ref<HTMLElement | null>(null);
const openDropdownBtnRef = ref<HTMLElement | null>(null);
const labelPopupRef = ref<HTMLElement | null>(null);
const showEditLabel: Ref<Boolean> = ref(false);
const labels = computed(() => store.getters["labels/getLabels"]);
const labelSearch: Ref<string> = ref("");
const userLogin = store.state.user.userLogin;

// methods
const getTaskDetail = async (id: string) => {
  try {
    const result = await taskServiceApi.getTaskDetail(id);
    if (result.status === STATUS_CODE.SUCCESS && result.data.success) {
      const taskDetail = result.data.data;
      store.dispatch("tasksModule/setTaskDetailAction", taskDetail);
      store.dispatch("modal/openModalAction", TaskDetail);
    }
  } catch (error: any) {
    toast.error(error.data.message);
  }
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

const deleteTask = (taskId: string, userId: string) => {
  tasksHelper.deleteTaskApi(store, taskId, userId);
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

const openLabelPopup = () => {
  showEditLabel.value = true;
  closeDropdown();
};

const handleCheckLabel = (event: any, labelId: string, taskId: string) => {
  const checked = event.target.checked;
  if (checked) {
    tasksHelper.attachLabel(userLogin.id, taskId, labelId, store);
  } else {
    tasksHelper.detachLabel(userLogin.id, taskId, labelId, store);
  }
};

onClickOutside(labelPopupRef, () => (showEditLabel.value = false));

// life cycle hooks
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

.task-labels {
  margin: 10px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 10px;
}

.task-widgets {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label-popup {
  position: absolute;
  background-color: #fff;
  z-index: 50;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.4);
  width: max-content;
  padding: 10px;
  border-radius: 10px;
}
.label-input {
  display: flex;
  align-items: center;
}
.label-input input {
  background-color: transparent;
  outline: none;
  border: none;
  flex: 1;
}
.label-input span {
  margin: 0;
  padding: 0;
}
.label-list {
  margin: 10px 0;
}
</style>
