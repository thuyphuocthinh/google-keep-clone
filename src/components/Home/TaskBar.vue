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
          <div class="d-flex align-items-center gap-2 task-time-start">
            <p>Start</p>
            <input
              type="datetime-local"
              class="form-control"
              id="timeStart"
              name="timeStart"
              style="width: 200px"
              v-model="task.timeStart"
            />
          </div>
          <div class="task-time-end d-flex align-items-center gap-2">
            <p>End</p>
            <input
              type="datetime-local"
              class="form-control"
              id="timeEnd"
              name="timeEnd"
              style="width: 200px"
              v-model="task.timeEnd"
            />
          </div>
        </div>
        <div class="task-status form-group mb-3">
          <label for="status">Status</label>
          <select
            name="status"
            id="status"
            v-model="task.status"
            class="form-select"
            style="width: 200px"
          >
            <option
              v-for="(status, index) in statusList"
              :key="index"
              :value="status.code"
            >
              {{ status.title }}
            </option>
          </select>
        </div>
        <div class="task-tools">
          <TaskWidgets />
          <div class="task-tools-right ms-auto">
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
import { onMounted, onUnmounted, reactive, ref, onUpdated, computed } from "vue";
import type { Ref } from "vue";
import { useTextareaAutosize, onClickOutside } from "@vueuse/core";
import { dateString } from "../../helpers/dateString";
import { Task } from "../../models/task";
import { validation } from "../../helpers/validation";
import { toast } from "vue3-toastify";
import { STATUS, STATUS_CODE } from "../../constants/index";
import * as taskServices from "../../services/taskServices";
import { useStore } from "vuex";
import { taskServiceApi } from "../../services/taskServicesApi";
import * as tasksHelper from "../../helpers/tasksHelper";
const store = useStore();
const { input, textarea } = useTextareaAutosize();
const isShowTaskBarMain: Ref<Boolean> = ref(false);
const taskTarget = ref(null);
const today: Ref<string> = ref(new Date().toISOString().slice(0, 16));
const userLogin = store.state.user.userLogin;
const statusList = computed(() => store.getters["tasksModule/getStatusList"]);

// handle create task
const resetValues = () => {
  input.value = "";
  task = {
    title: "",
    content: input.value,
    image: "",
    timeStart: today.value,
    timeEnd: today.value,
    label: [],
    status: STATUS.TODO,
    createdBy: userLogin.id,
  };
};

let task: Task = reactive({
  title: "",
  content: input.value,
  image: "",
  timeStart: today.value,
  timeEnd: today.value,
  status: STATUS.TODO,
  label: [],
  createdBy: userLogin.id,
});

onUpdated(() => {
  task = { ...task, ["content"]: input.value };
});

onMounted(() => {
  tasksHelper.getStatusListApi(store);
});

const createNewTask = async () => {
  const result = validation(task, ["title", "content"]);
  if (result.isValid) {
    const response = await taskServiceApi.createTask(task);
    if (response.status === STATUS_CODE.SUCCESS && response.data.success) {
      closeTaskBarMain();
      tasksHelper.getTasksApi(userLogin.id, store);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } else {
    const error = result.arrErrors.join(", ");
    toast.error(error + " " + "cannot be empty");
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
  flex-wrap: wrap;
  color: #606060;
  font-weight: 500;
  padding-left: 3px;
  gap: 20px;
}

.task-status {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #606060;
  font-weight: 500;
  padding-left: 3px;
}

.task-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
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
