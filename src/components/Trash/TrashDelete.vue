<template>
  <div class="trash-widgets">
    <a-popconfirm
      title="Are you sure to delete this task permanently？"
      ok-text="Yes"
      cancel-text="No"
      @confirm="handleDeletePermanently"
    >
      <span title="Xóa vĩnh viễn">
        <i class="fa-solid fa-trash"></i>
      </span>
    </a-popconfirm>
    <span title="Khôi phục" @click="handleRecoverTask">
      <i class="fa-solid fa-trash-can-arrow-up"></i>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import {
  deleteTaskPermanentlyService,
  recoverTaskService,
} from "../../services/taskServices";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps<{
  id: number;
}>();

const handleRecoverTask = () => {
  recoverTaskService(props.id);
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  store.dispatch("tasksModule/setTasksAction", tasksStorage);
  toast("Recovered task successfully", {
    theme: "colored",
    type: "success",
    dangerouslyHTMLString: false,
  });
};

const handleDeletePermanently = () => {
  deleteTaskPermanentlyService(props.id);
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  store.dispatch("tasksModule/setTasksAction", tasksStorage);
  toast("Deleted task permenantly successfully", {
    theme: "colored",
    type: "success",
    dangerouslyHTMLString: false,
  });
};
</script>

<style>
.trash-widgets {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
}

.trash-widgets span {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #414141;
}

.trash-widgets span:hover {
  cursor: pointer;
  background-color: #dfdfdf;
}
</style>
