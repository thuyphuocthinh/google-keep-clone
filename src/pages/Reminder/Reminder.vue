<template>
  <div class="reminder">
    <div v-if="isLoading" class="loading-spinner">
      <Loading />
    </div>
    <div v-else class="trash-container">
      <div class="container">
        <h5 class="mb-4">Lời nhắc</h5>
        <div class="row" v-if="taskReminded.length > 0">
          <div
            v-for="task in taskReminded"
            :key="task.id"
            class="col-lg-3 col-md-6 col-12 mb-4"
          >
            <TaskItem :task="task" />
          </div>
        </div>
        <p v-else>Không có task nào</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import type { Ref } from "vue";
import { useStore } from "vuex";
import TaskItem from "../../components/Home/TaskItem.vue";
import * as tasksHelper from "../../helpers/tasksHelper";
import Loading from "../../components/Loading/Loading.vue";

const store = useStore();
const userLogin = store.state.user.userLogin;
const isLoading: Ref<Boolean> = ref(true);
const taskReminded = computed(() => store.getters["tasksModule/getTaskReminded"]);

onMounted(async () => {
  try {
    await tasksHelper.getTaskReminded(userLogin.id, store);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.reminder {
  margin-top: 100px;
}
</style>
