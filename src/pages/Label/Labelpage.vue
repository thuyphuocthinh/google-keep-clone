<template>
  <div class="label my-4">
    <div v-if="isLoading" class="loading-spinner">
      <Loading />
    </div>
    <div v-else class="label-container">
      <div class="container">
        <h5 class="mb-4">{{ labelDetail.label?.title }}</h5>
        <div class="row" v-if="labelDetail.taskList.length > 0">
          <div
            v-for="task in labelDetail.taskList"
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
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import TaskItem from "../../components/Home/TaskItem.vue";
import * as labelsHelper from "../../helpers/labelHelper";
import { computed, onBeforeMount, watch, ref, onMounted } from "vue";
import type { Ref } from "vue";
import Loading from "../../components/Loading/Loading.vue";
const store = useStore();
const route = useRoute();
const labelDetail = computed(() => store.getters["labels/getLabelDetail"]);
const isLoading: Ref<Boolean> = ref(true);

watch(
  () => route.params.labelId, // Watch the route's path specifically
  (newId: string, oldId: string) => {
    if (newId !== oldId && newId) {
      isLoading.value = true;
      labelsHelper.getLabelById(store, newId);
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    }
  }
);

// life cycle
onBeforeMount(() => {
  const labelId: any = route.params.labelId;
  labelsHelper.getLabelById(store, labelId);
});

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>
<style></style>
