<template>
  <div class="workspace">
    <div v-if="isLoading" class="loading-spinner">
      <Loading />
    </div>
    <div v-else class="workspace-container">
      <div class="row mt-4">
        <div class="col-md-4 col-12 mb-md-0 mb-3">
          <div class="workspace-col">
            <h5>Todo</h5>
            <div class="col-content todo">
              <VueDraggable
                class="d-flex flex-column gap-2 draggable-col"
                ghostClass="ghost"
                v-model="tasksTodo"
                animation="150"
                group="people"
                title="todo"
                @update="onUpdate"
                @add="onAdd"
                @remove="onRemove"
                @start="onStart"
                @end="onEnd"
                @clone="onClone"
                @change="onChange"
                @move="onMove"
              >
                <div v-for="task in tasksTodo" :key="task.id">
                  <TaskItem :task="task" :status="task.status" />
                </div>
              </VueDraggable>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12 mb-md-0 mb-3">
          <div class="workspace-col">
            <h5>In progress</h5>
            <div class="col-content progress">
              <VueDraggable
                class="d-flex flex-column gap-2 draggable-col"
                v-model="tasksProgress"
                ghostClass="ghost"
                animation="150"
                group="people"
                title="progress"
                @update="onUpdate"
                @add="onAdd"
                @remove="onRemove"
                @start="onStart"
                @end="onEnd"
                @clone="onClone"
                @change="onChange"
                @move="onMove"
              >
                <div v-for="task in tasksProgress" :key="task.id">
                  <TaskItem :task="task" :status="task.status" />
                </div>
              </VueDraggable>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12 mb-md-0 mb-3">
          <div class="workspace-col">
            <h5>Done</h5>
            <div class="col-content done">
              <VueDraggable
                class="d-flex flex-column gap-2 draggable-col"
                v-model="tasksDone"
                ghostClass="ghost"
                animation="150"
                group="people"
                title="done"
                @update="onUpdate"
                @add="onAdd"
                @remove="onRemove"
                @start="onStart"
                @end="onEnd"
                @clone="onClone"
                @change="onChange"
                @move="onMove"
              >
                <div v-for="task in tasksDone" :key="task.id">
                  <TaskItem :task="task" />
                </div>
              </VueDraggable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import TaskItem from "./TaskItem.vue";
import { VueDraggable, DraggableEvent } from "vue-draggable-plus";
import { changeTaskStatusService } from "../../services/taskServices";
import type { Ref } from "vue";
import { ref } from "vue";
import Loading from "../Loading/Loading.vue";
// Access the store instance
const store = useStore();
const tasksTodo = computed(() => store.getters["tasksModule/getTasksTodo"]);
const tasksProgress = computed(
  () => store.getters["tasksModule/getTasksProgress"]
);
const tasksDone = computed(() => store.getters["tasksModule/getTasksDone"]);
const isLoading: Ref<Boolean> = ref(true);
onMounted(() => {
  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", "[]");
  }
  const tasksStorage = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (tasksStorage.length > 0) {
    store.dispatch("tasksModule/setTasksAction", tasksStorage);
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

// VueDraggable event handlers
function onStart(event: DraggableEvent) {
  console.log("start drag event");
}

function onEnd(event: DraggableEvent) {
  console.log("end drag event");
}

function onUpdate(event: DraggableEvent) {
  console.log("update event");
}

function onAdd(event: DraggableEvent) {
  // console.log("---------------------");
  // console.log("add event from ", event.from.title);
  // console.log("add event from ", event.clonedData);
  // console.log("add event to ", event.to.title);
  const id: number = event.clonedData.id;
  const oldStatus: string = event.from.title;
  const newStatus: string = event.to.title;
  changeTaskStatusService(id, oldStatus, newStatus);
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  store.dispatch("tasksModule/setTasksAction", tasksStorage);
  // console.log("Change status successfully");
  // console.log("---------------------");
}

function onRemove(event: DraggableEvent) {
  console.log("remove event");
}

function onClone(event: DraggableEvent) {}

function onChange(event: DraggableEvent) {}

function onMove(event: MoveEvent, originalEvent: Event) {}

// life cycle
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
  height: auto;
  background-color: #f1f3f4;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.col-content .draggable-col {
  min-height: 300px;
}

.col-content.progress {
  overflow: visible !important;
}

.workspace-col h5 {
  text-align: center;
  margin-bottom: 10px;
  color: #555555;
  font-size: 17px;
}

.ghost {
  opacity: 1 !important;
  cursor: grab !important;
}
</style>
