<template>
  <div class="taskbar">
    <div class="taskbar-container" ref="taskTarget">
      <div v-if="!isShowTaskBarMain" class="taskbar-header">
        <div class="taskbar-left" @click="showTaskBarMain">Tạo ghi chú ...</div>
        <div class="taskbar-right">
          <span>
            <i class="fa-regular fa-square-check"></i>
          </span>
          <span>
            <i class="fa-solid fa-paintbrush"></i>
          </span>
          <span>
            <i class="fa-regular fa-image"></i>
          </span>
        </div>
      </div>
      <div v-if="isShowTaskBarMain" class="taskbar-main">
        <div class="task-title">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Tiêu đề"
            v-model="task.title"
          />
        </div>
        <div class="task-content">
          <textarea
            name="content"
            id="content"
            ref="textarea"
            v-model="input"
            placeholder="Nội dung ..."
          ></textarea>
        </div>
        <div class="task-time mb-3">
          <p>Deadline</p>
          <input
            type="datetime-local"
            class="form-control"
            id="birthdaytime"
            name="birthdaytime"
            style="width: 200px"
            v-model="task.deadline"
            :min="today"
            :value="today"
          />
        </div>
        <div class="task-tools">
          <TaskWidgets />
          <div class="task-tools-right">
            <button type="button" class="btn-create" @click="createNewTask">
              Tạo
            </button>
            <button type="button" @click="closeTaskBarMain">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskWidgets from "./TaskWidgets.vue";
import { onMounted, onUnmounted, reactive, ref, onUpdated } from "vue";
import type { Ref } from "vue";
import { useTextareaAutosize, onClickOutside } from "@vueuse/core";
import { dateString } from "../../helpers/dateString";
import { Task } from "../../models/task";
import { validation } from "../../helpers/validation";
import { toast } from "vue3-toastify";
import { STATUS } from "../../constants/index";
import * as taskServices from "../../services/taskServices";
import { useStore } from "vuex";
const store = useStore();
const { input, textarea } = useTextareaAutosize();
const isShowTaskBarMain: Ref<Boolean> = ref(false);
const taskTarget = ref(null);
const today: Ref<string> = ref(new Date().toISOString().slice(0, 16));

// handle create task

const resetValues = () => {
  input.value = "";
  task = {
    id: Date.now(),
    title: "",
    content: input.value,
    image: "",
    deadline: today.value,
    status: STATUS.TODO,
    deleted: false,
    createdAt:
      new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString(),
  };
};

let task: Task = reactive({
  id: Date.now(),
  title: "",
  content: input.value,
  image: "",
  deadline: today.value,
  status: STATUS.TODO,
  deleted: false,
  createdAt:
    new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString(),
});

onUpdated(() => {
  task = { ...task, ["content"]: input.value };
});

const createNewTask = () => {
  const result = validation(task, ["title", "content", "deadline"]);
  if (result.isValid) {
    taskServices.createNewTaskService(task);
    closeTaskBarMain();
    const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
    store.dispatch("tasksModule/setTasksAction", tasksStorage);
  } else {
    const error = result.arrErrors.join(", ");
    toast(error + " " + "cannot be empty", {
      theme: "colored",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
};

// handle show hide taskbar
const showTaskBarMain = () => {
  isShowTaskBarMain.value = true;
};

const closeTaskBarMain = () => {
  isShowTaskBarMain.value = false;
  resetValues();
};

onClickOutside(taskTarget, () => closeTaskBarMain());
</script>

<style>
.taskbar {
  margin-top: 30px;
}

.taskbar-container {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.taskbar-header {
  display: flex;
  align-items: center;
  height: 45px;
  padding: 0 10px;
}

.taskbar-left {
  flex: 1;
  font-weight: 500;
  font-size: 16px;
  padding-left: 10px;
  color: #606060;
  cursor: text;
}

.taskbar-right {
  display: flex;
  align-items: center;
  gap: 5px;
}

.taskbar-right span {
  color: #606060;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

.taskbar-right span:hover {
  background-color: #e0e0e0;
}

.taskbar-main {
  padding: 10px;
  width: 100%;
}

.task-title input {
  width: 100%;
  outline: none;
  border: none;
  height: 30px;
  font-size: 15px;
  color: #606060;
  font-weight: 500;
}

.task-content textarea {
  resize: none;
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  color: #606060;
  /* font-weight: 500; */
  padding: 20px 0;
  padding-left: 3px;
  overflow-y: hidden;
}

.task-time {
  display: flex;
  align-items: center;
  color: #606060;
  font-weight: 500;
  padding-left: 3px;
  gap: 20px;
}

.task-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-tools-right button {
  border: none;
  background-color: transparent;
  outline: none;
  font-weight: 500;
  color: #606060;
  padding: 6px 30px;
}

.task-tools-right .btn-create {
  background-color: #fbbc04;
  color: #fff;
}

.task-tools-right button:hover {
  background-color: #f2f2f2;
}

.task-tools-right .btn-create:hover {
  background-color: #ffd65c;
}
</style>
