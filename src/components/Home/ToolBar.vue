<template>
  <div
    class="toolbar"
    :class="tasksSelected.length > 0 ? 'toolbar-block' : 'toolbar-hidden'"
    ref="toolBarRef"
  >
    <div class="container-fluid">
      <div class="toolbar-container">
        <div class="toolbar-left">
          <span @click="handleCloseToolBar">
            <i class="fa-solid fa-x"></i>
          </span>
          <span class="toolbar-title"
            >{{ tasksSelected.length }} selected tasks</span
          >
        </div>
        <div class="toolbar-right">
          <a-popconfirm
            title="Are you sure to delete these tasks"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleDeleteTasks"
          >
            <span v-if="!showDeletedPermanent">
              <i class="fa-solid fa-trash"></i>
            </span>
          </a-popconfirm>
          <span
            v-if="showDeletedPermanent"
            title="Khôi phục"
            @click="handleRecoverTasks"
          >
            <i class="fa-solid fa-trash-can-arrow-up"></i>
          </span>
          <a-popconfirm
            title="Are you sure to delete these tasks permanently?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleDeleteTasksPermanently"
          >
            <span v-if="showDeletedPermanent" title="Xóa vĩnh viễn">
              <i class="fa-solid fa-trash"></i>
            </span>
          </a-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  deleteMultipleTasksService,
  deleteTaskPermanentlyService,
  recoverTaskService,
} from "../../services/taskServices";
import { computed, onMounted, onUnmounted, onUpdated } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import type { Ref } from "vue";
import { ref } from "vue";
import { Task } from "../../models/task";
const store = useStore();
const tasksSelected = computed(
  () => store.getters["tasksModule/getTasksSelected"]
);
const showDeletedPermanent: Ref<Boolean> = ref(false);
const toolBarRef = ref(null);

const handleClickOutside = (e: Event) => {
  let id = parseInt(e.target.getAttribute("id"));
  if (
    e.target === document.querySelector(".toolbar") ||
    e.target.closest(".toolbar")
  )
    return;
  if (isNaN(id)) {
    handleCloseToolBar();
  } else {
    if (!tasksSelected.value.includes(id) && tasksSelected.value.length === 0) {
      handleCloseToolBar();
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUpdated(() => {
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  for (const id of tasksSelected.value) {
    const find: Task = tasksStorage.find((task: Task) => task.id === id);
    if (find.deleted) {
      showDeletedPermanent.value = true;
      break;
    }
  }
  if (tasksSelected.value.length === 0) showDeletedPermanent.value = false;
});

onUnmounted(() => {
  showDeletedPermanent.value = false;
  removeEventListener("click", handleClickOutside);
});

const handleCloseToolBar = () => {
  store.dispatch("tasksModule/resetTasksSelectedAction");
};

const handleDeleteTasks = () => {
  if (tasksSelected.value.length > 0) {
    deleteMultipleTasksService(tasksSelected.value);
    store.dispatch("tasksModule/resetTasksSelectedAction");
    const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
    store.dispatch("tasksModule/setTasksAction", tasksStorage);
    toast("Deleted tasks successfully", {
      theme: "colored",
      type: "success",
      dangerouslyHTMLString: false,
    });
  }
};

const handleDeleteTasksPermanently = () => {
  if (tasksSelected.value.length > 0) {
    for (const id of tasksSelected.value) {
      deleteTaskPermanentlyService(id);
    }
  }
  store.dispatch("tasksModule/resetTasksSelectedAction");
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  store.dispatch("tasksModule/setTasksAction", tasksStorage);
};

const handleRecoverTasks = () => {
  if (tasksSelected.value.length > 0) {
    for (const id of tasksSelected.value) {
      recoverTaskService(id);
    }
  }
  store.dispatch("tasksModule/resetTasksSelectedAction");
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  store.dispatch("tasksModule/setTasksAction", tasksStorage);
};
</script>

<style>
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  0% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}

.toolbar {
  border-bottom: 1px solid rgb(214, 214, 214);
  background-color: #fff;
  padding: 15px 5px;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid rgb(214, 214, 214);
  right: 0;
  z-index: 30;
  background-color: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
}

.toolbar-hidden {
  transition: all 0.5s;
  animation: slideUp 0.5s forwards;
}

.toolbar-block {
  display: block;
  transition: all 0.5s;
  animation: slideDown 0.5s forwards;
}

.toolbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
}

.toolbar-left {
  gap: 20px;
}

.toolbar-left span {
  font-weight: bold;
  font-size: 18px;
}

.toolbar-left span:first-child,
.toolbar-right span {
  font-weight: bold;
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.toolbar-left span:first-child:hover,
.toolbar-right span:hover {
  background-color: #ededed;
  cursor: pointer;
}
</style>
