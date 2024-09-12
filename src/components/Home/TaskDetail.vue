<template>
  <div class="task-detail">
    <div class="task-header">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Tiêu đề"
        v-model="taskUpdate.title"
      />
    </div>
    <div class="task-deadline">
      <span>
        <i class="fa-regular fa-clock"></i>
        Deadline
      </span>
      <input
        type="datetime-local"
        class="form-control"
        id="birthdaytime"
        name="birthdaytime"
        style="width: 200px"
        v-model="taskUpdate.deadline"
        :min="today"
      />
    </div>
    <div class="task-content">
      <span>
        <textarea
          name="content"
          id="content"
          ref="textarea"
          v-model="input"
          placeholder="Nội dung ..."
        ></textarea>
      </span>
    </div>
    <div class="task-widgets">
      <TaskWidgets />
    </div>
    <div class="task-button">
      <a-button type="default" @click="cancel">Cancel</a-button>
      <a-button type="primary" @click="updateTask">Save changes</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TaskWidgets from "./TaskWidgets.vue";
import { useStore } from "vuex";
import { computed, onMounted, onUpdated, reactive, ref } from "vue";
import { useTextareaAutosize } from "@vueuse/core";
import { validation } from "../../helpers/validation";
import { toast } from "vue3-toastify";
import { updateTaskService } from "../../services/taskServices";
const { input, textarea } = useTextareaAutosize();
const today: Ref<string> = ref(new Date().toISOString().slice(0, 16));

const store = useStore();
const taskDetail = computed(() => store.state.tasksModule.taskDetail);

let taskUpdate: Task = reactive({
  id: taskDetail.value.id,
  title: taskDetail.value.title,
  content: taskDetail.value.content,
  image: taskDetail.value.image,
  deadline: taskDetail.value.deadline,
  status: taskDetail.value.status,
  deleted: taskDetail.value.deleted,
  createdAt: taskDetail.value.createdAt,
});

onMounted(() => {
  input.value = taskDetail.value.content;
});

onUpdated(() => {
  taskUpdate = { ...taskUpdate, ["content"]: input.value };
});

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

const cancel = () => {
  store.dispatch("modal/closeModalAction");
};
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
  margin-bottom: 5px;
}

.task-detail .task-header input {
  width: 100%;
  outline: none;
  border: none;
  height: 30px;
  font-size: 16px;
  color: #606060;
  font-weight: 500;
}

.task-detail .task-deadline {
  display: flex;
  align-items: center;
  gap: 10px;
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
