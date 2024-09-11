<template>
  <div>
    <a-modal
      v-model:open="modal.open"
      @cancel="handleCancel"
      width="600px"
      closable="false"
    >
      <component :is="modal.component"></component>
      <template #footer> </template>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const modal = computed(() => ({
  open: store.state.modal.isOpen,
  component: store.state.modal.component,
}));

const handleCancel = (e: MouseEvent) => {
  store.dispatch("modal/closeModalAction");
};
</script>
