<template>
  <div class="trash my-4">
    <div v-if="isLoading" class="loading-spinner">
      <Loading />
    </div>
    <div v-else class="trash-container">
      <div class="container">
        <h6 class="mb-4">^ _ ^ Ghi chú trong thùng sẽ bị xóa sau 7 ngày ^ _ ^</h6>
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
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { Ref } from "vue";
import { useStore } from "vuex";
import TaskItem from "../../components/Home/TaskItem.vue";
import * as tasksHelper from "../../helpers/tasksHelper";
import Loading from "../../components/Loading/Loading.vue";

const store = useStore();
const userLogin = store.state.user.userLogin;
const isLoading: Ref<Boolean> = ref(true);
const tasksDeleted = computed(() => store.getters["tasksModule/getTasksDeleted"]);

onMounted(async () => {
  try {
    await tasksHelper.getTasksDeleted(userLogin.id, store);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
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
