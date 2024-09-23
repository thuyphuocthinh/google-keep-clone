<template>
  <div class="task-detail">
    <div v-if="taskImageRef || taskDetail.image" class="task-image">
      <img v-if="taskImageRef" :src="taskImageRef" :alt="taskImageRef" />
      <img v-else :src="taskDetail.image" :alt="taskDetail.image" />
    </div>
    <div class="task-header">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Tiêu đề"
        v-model="taskUpdate.title"
        :disabled="taskDetail.deleted"
      />
    </div>
    <div class="task-deadline">
      <div class="task-timeStart">
        <span>
          <i class="fa-regular fa-clock"></i>
          Start
        </span>
        <input
          type="datetime-local"
          class="form-control"
          id="birthdaytime"
          name="birthdaytime"
          style="width: 200px"
          v-model="taskUpdate.timeStart"
          :min="today"
          :disabled="taskDetail.deleted"
        />
      </div>
      <div class="task-timeEnd">
        <span>
          <i class="fa-regular fa-clock"></i>
          End
        </span>
        <input
          type="datetime-local"
          class="form-control"
          id="birthdaytime"
          name="birthdaytime"
          style="width: 200px"
          v-model="taskUpdate.timeEnd"
          :min="today"
          :disabled="taskDetail.deleted"
        />
      </div>
    </div>
    <div class="task-status form-group my-3">
      <label for="status">Status</label>
      <select
        name="status"
        id="status"
        v-model="taskUpdate.status"
        class="form-select"
        style="width: 200px"
        :disabled="taskDetail.deleted"
      >
        <option v-for="(status, index) in statusList" :key="index" :value="status.code">
          {{ status.title }}
        </option>
      </select>
    </div>
    <div class="task-content">
      <span>
        <textarea
          name="content"
          id="content"
          ref="textarea"
          v-model="input"
          placeholder="Nội dung ..."
          :disabled="taskDetail.deleted"
        ></textarea>
      </span>
    </div>
    <div v-if="!taskDetail.deleted" class="task-widgets">
      <TaskWidgets />
    </div>
    <div v-if="!taskDetail.deleted" class="task-button">
      <a-button type="default" @click="cancel">Cancel</a-button>
      <a-button type="primary" @click="updateTaskApi" :loading="showLoading"
        >Save changes
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TaskWidgets from "./TaskWidgets.vue";
import { useStore } from "vuex";
import { computed, onMounted, onUpdated, reactive, ref, watch } from "vue";
import type { Ref } from "vue";
import { useTextareaAutosize } from "@vueuse/core";
import { validation } from "../../helpers/validation";
import { toast } from "vue3-toastify";
import * as tasksHelper from "../../helpers/tasksHelper";
import { Task } from "../../models/task";
const { input, textarea } = useTextareaAutosize();
const today: Ref<string> = ref(new Date().toISOString().slice(0, 16));
const store = useStore();
const taskDetail = computed(() => store.state.tasksModule.taskDetail);
const showLoading = computed(() => store.getters["loading/getLoadingState"]);
const statusList = computed(() => store.getters["tasksModule/getStatusList"]);
const taskImageRef: Ref<string> = ref("");
const userLogin = store.state.user.userLogin;
const taskImage = computed(() => store.getters["tasksModule/getTaskImage"]);

let taskUpdate: Task = reactive({
  id: taskDetail.value.id,
  title: taskDetail.value.title,
  content: taskDetail.value.content,
  image: taskDetail.value.image,
  timeStart: taskDetail.value.timeStart.slice(0, 16),
  timeEnd: taskDetail.value.timeEnd.slice(0, 16),
  deleted: taskDetail.value.deleted,
  status: taskDetail.value.status,
  label: taskDetail.value.label,
  createdBy: taskDetail.value.createdBy,
});

watch(
  () => taskImage.value,
  (newValue: File, oldValue: File) => {
    if (newValue !== oldValue && newValue) {
      taskImageRef.value = URL.createObjectURL(newValue);
      taskUpdate.image = newValue;
    }
  }
);

onMounted(() => {
  input.value = taskDetail.value.content;
  tasksHelper.getStatusListApi(store);
});

onUpdated(() => {
  taskUpdate = { ...taskUpdate, ["content"]: input.value };
});

const updateTaskApi = async () => {
  try {
    const result = validation(taskUpdate, [
      "title",
      "content",
      "timeStart",
      "timeEnd",
      "status",
    ]);
    if (result.isValid) {
      const formData: FormData = new FormData();
      for (const key in taskUpdate) {
        if (Object.prototype.hasOwnProperty.call(taskUpdate, key)) {
          const element = taskUpdate[key as keyof Task] as string;
          formData.set(key, element);
        }
      }
      tasksHelper.updateTaskApi(formData, userLogin.id, store);
    } else {
      const error = result.arrErrors.join(", ");
      toast.error(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const cancel = () => {
  store.dispatch("modal/closeModalAction");
};

/*
const updateTask = () => {
  const result = validation(taskUpdate, ["title", "content", "deadline"]);
  if (result.isValid) {
    updateTaskService(taskUpdate);
    const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
    store.dispatch("tasksModule/setTasksAction", tasksStorage);
    store.dispatch("modal/closeModalAction");
    toast("Updated task successfully", {
      theme: "colored",
      type: "success",
      dangerouslyHTMLString: false,
    });
  } else {
    const error = result.arrErrors.join(", ");
    toast(error + " " + "cannot be empty", {
      theme: "colored",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
};
*/
</script>

<style>
.task-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.task-detail .task-header {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.task-detail .task-header input {
  width: 100%;
  outline: none;
  border: none;
  height: 30px;
  font-size: 18px;
  color: #606060;
  font-weight: 500;
}

.task-detail .task-deadline {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.task-detail .task-deadline div {
  display: flex;
  align-items: center;
  gap: 5px;
}

.task-detail .task-deadline div span {
  font-weight: 500;
}

.task-detail .task-content {
  flex: 1;
  padding: 20px 0;
  min-height: 200px;
  font-size: 16px;
}

.task-detail .task-button {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}
</style>
