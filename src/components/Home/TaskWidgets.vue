<template>
  <div class="task-tools-left">
    <label for="image">
      <span class="task-tools-image">
        <i class="fa-regular fa-image"></i>
      </span>
    </label>
    <input type="file" name="image" id="image" hidden @change="handleUpload" />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";

const emit = defineEmits(["uploadImage"]);
const store = useStore();

const handleUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target) {
    const file: File = (target.files as FileList)[0];
    store.dispatch("tasksModule/setTaskImageAction", file);
  }
};
</script>

<style>
.task-tools-left {
  display: flex;
  align-items: center;
}

.task-tools-left .task-tools-image,
.task-tools-right span {
  display: flex;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  color: #606060;
  margin-right: 10px;
}

.task-tools-left span:hover {
  background-color: #e0e0e0;
}

.task-tools-right {
  position: relative;
}

.task-tools-right span:hover {
  background-color: #e0e0e0;
}

.dropdown {
  background-color: #fff;
  min-width: fit-content;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  position: absolute;
  right: 0;
  /* bottom: 40px; */
  left: 100%;
  transform: translateX(-40%);
  padding: 10px 0;
  z-index: 1000;
}

.dropdown-list {
  padding: 0;
  margin: 0;
}

.dropdown-item {
  padding: 5px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0;
}

.dropdown-item span {
  width: 20px;
  height: 20px;
}

.dropdown-item:hover {
  background-color: #e0e0e0;
}
</style>
