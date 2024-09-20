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
import { useStore } from "vuex";
import * as tasksHelper from "../../helpers/tasksHelper";

const store = useStore();
const userLogin = store.state.user.userLogin;
const props = defineProps<{
  id: string;
}>();

const handleRecoverTask = () => {
  tasksHelper.recoverOneTask(props.id, userLogin.id, store);
};

const handleDeletePermanently = () => {
  tasksHelper.deleteTaskPermanently(userLogin.id, props.id, store);
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
