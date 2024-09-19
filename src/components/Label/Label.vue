<template>
  <div>
    <h6>Quản lí nhãn</h6>
    <div class="label-create">
      <input
        type="text"
        v-model="label.title"
        name="title"
        id="title"
        placeholder="Tạo nhãn mới"
      />
      <button @click="handleCreateLabel" :disabled="label.title ? false : true">
        <i class="fa-solid fa-check"></i>
      </button>
    </div>
    <div class="label-list">
      <div v-for="(label, index) in labels" :key="index" class="label-item">
        <p v-if="editMode !== label._id" class="label-title">
          {{ label.title }}
        </p>
        <div v-else class="label-edit-input">
          <input
            type="text"
            v-model="labelEdit.newTitle"
            name="title"
            id="title"
            placeholder="Tên nhãn"
          />
          <button
            @click="handleUpdateLabel"
            :disabled="labelEdit.newTitle ? false : true"
          >
            <i class="fa-solid fa-check"></i>
          </button>
          <button @click="handleCloseEditMode">
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
        <a-popconfirm
          title="Are you sure to delete these tasks"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleDeleteLabel(label._id)"
          v-if="editMode !== label._id"
        >
          <span v-if="editMode !== label._id" class="label-trash">
            <i class="fa-solid fa-trash"></i>
          </span>
        </a-popconfirm>
        <span
          v-if="editMode !== label._id"
          class="label-edit"
          @click="handleOpenEditMode(label)"
        >
          <i class="fa-solid fa-pen"></i>
        </span>
      </div>
    </div>
    <div class="label-footer">
      <a-button @click="closeModal" type="primary">Xong</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, onMounted, reactive, ref } from "vue";
import type { Ref } from "vue";
import * as labelsHelper from "../../helpers/labelHelper";
import { Label } from "../../models/label";
const store = useStore();
const labels = computed(() => store.getters["labels/getLabels"]);
const userLogin = store.state.user.userLogin;
const editMode: Ref<string> = ref("");
const label: Label = reactive({
  title: "",
  createdBy: userLogin.id,
});
const labelEdit = reactive({
  newTitle: "",
  labelId: "",
  createdBy: userLogin.id,
});

// methods
const closeModal = () => {
  store.dispatch("modal/closeModalAction");
};
const handleCreateLabel = async () => {
  await labelsHelper.createLabel(store, userLogin.id, label);
  label.title = "";
};

const handleDeleteLabel = async (labelId: string) => {
  await labelsHelper.deleteLabel(store, userLogin.id, labelId);
};

const handleOpenEditMode = async (label: any) => {
  editMode.value = label._id;
  labelEdit.newTitle = label.title;
  labelEdit.labelId = label._id;
};

const handleCloseEditMode = () => {
  editMode.value = "";
  labelEdit.newTitle = "";
  labelEdit.labelId = "";
};

const handleUpdateLabel = async () => {
  // console.log(labelEdit);
  await labelsHelper.updateLabel(store, userLogin.id, labelEdit);
  handleCloseEditMode();
};

// life cycle hooks
onMounted(() => {
  labelsHelper.getLabels(store, userLogin.id);
});
</script>
<style scoped>
.label-create,
.label-edit-input {
  margin: 20px 0;
  display: flex;
  align-items: center;
}
.label-edit-input {
  flex: 1;
  margin: 0;
}
.label-create input,
.label-edit-input input {
  width: 100%;
  flex: 1;
  height: 40px;
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px dashed gray;
}
.label-create button,
.label-edit-input button {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 18px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
}
.label-create button:hover,
.label-edit-input button:hover {
  background-color: #dadada;
}

.label-list {
  width: 100%;
  margin: 20px 0;
}

.label-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.label-item span {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.label-item span:hover {
  background-color: #dadada;
  cursor: pointer;
}

.label-item .label-title {
  flex: 1;
  font-weight: 500;
}
.label-footer {
  text-align: end;
}
</style>
