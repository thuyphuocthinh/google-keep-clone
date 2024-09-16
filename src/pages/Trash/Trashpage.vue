<template>
  <div class="trash my-4">
    <div class="trash-container">
      <div class="container">
        <h6 class="mb-4">
          ^ _ ^ Ghi chú trong thùng sẽ bị xóa sau 7 ngày ^ _ ^
        </h6>
        <div class="row">
          <div
            v-for="task in tasksDeleted"
            :key="task.id"
            class="col-lg-3 col-md-6 col-12 mb-4"
          >
            <TaskItem :task="task" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import TaskItem from "../../components/Home/TaskItem.vue";
import * as tasksHelper from "../../helpers/tasksHelper";
const store = useStore();
const userLogin = store.state.user.userLogin;

const tasksDeleted = computed(
  () => store.getters["tasksModule/getTasksDeleted"]
);

onMounted(() => {
  tasksHelper.getTasksDeleted(userLogin.id, store);
});

onUnmounted(() => {
  store.dispatch("tasksModule/setShowDeletedPermanentIconAction");
});
</script>

<style scoped>
h6 {
  text-align: center;
  font-weight: 300;
  font-style: italic;
  font-size: 18px;
}
</style>
