<template>
  <div class="task-tools-left">
    <span>
      <i class="fa-regular fa-bell"></i>
    </span>
    <span>
      <i class="fa-solid fa-user-plus"></i>
    </span>
    <span>
      <i class="fa-solid fa-palette"></i>
    </span>
    <span>
      <i class="fa-regular fa-image"></i>
    </span>
  </div>
  <div class="task-tools-right">
    <span @click="openDropdown" ref="openDropdownBtnRef">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </span>
    <div class="dropdown" v-if="isDropdownOpen" ref="dropdownRef">
      <ul class="dropdown-list">
        <a-popconfirm
          ref="popconfirmRef"
          title="Are you sure to delete this task？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="confirm(props.id)"
          @cancel="cancel"
        >
          <li class="dropdown-item">
            <span class="sider-icon">
              <i class="fa-solid fa-trash"></i>
            </span>
            Delete
          </li>
        </a-popconfirm>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { deleteTaskService } from "../../services/taskServices";
import { toast } from "vue3-toastify";
import { useStore } from "vuex";
const isDropdownOpen: Ref<Boolean> = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const popconfirmRef = ref<HTMLElement | null>(null);
const openDropdownBtnRef = ref<HTMLElement | null>(null);
const store = useStore();
const props = defineProps<{
  id: number;
}>();

const openDropdown = () => {
  isDropdownOpen.value = true;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const confirm = (id: number) => {
  deleteTaskService(id);
  toast("Deleted task successfully", {
    theme: "colored",
    type: "success",
    dangerouslyHTMLString: false,
  });
  const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
  store.dispatch("tasksModule/setTasksAction", tasksStorage);
};

const cancel = () => {
  closeDropdown();
};

const handleClickOutside = (event: MouseEvent) => {
  const dropdownElement = dropdownRef.value;
  const openDropdownBtnElement = openDropdownBtnRef.value;
  const popconfirmElement = popconfirmRef.value;
  if (
    dropdownElement &&
    !dropdownElement.contains(event.target as Node) &&
    event.target !== openDropdownBtnElement &&
    popconfirmElement &&
    event.target !== popconfirmElement
  ) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style>
.task-tools-left {
  display: flex;
  align-items: center;
}

.task-tools-left span,
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
