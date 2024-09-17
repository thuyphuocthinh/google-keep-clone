<template>
  <div class="form">
    <div class="form-container">
      <h4 class="text-center mb-4">Register</h4>
      <a-form
        :model="formState"
        class="register-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        layout="vertical"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            { required: true, message: 'Please input your email!' },
            {
              pattern: new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
              message: 'Invalid email',
            },
          ]"
        >
          <a-input v-model:value="formState.email">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="FirstName"
          name="firstname"
          :rules="[
            { required: true, message: 'Please input your FirstName!' },
            {
              min: 1,
              message: 'Min length is 1',
            },
            {
              max: 100,
              message: 'Max length is 100',
            },
          ]"
        >
          <a-input v-model:value="formState.firstname">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="LastName"
          name="lastname"
          :rules="[
            { required: true, message: 'Please input your LastName!' },
            {
              min: 1,
              message: 'Min length is 1',
            },
            {
              max: 100,
              message: 'Max length is 100',
            },
          ]"
        >
          <a-input v-model:value="formState.lastname">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[
            { required: true, message: 'Please input your password!' },
            {
              pattern: new RegExp(
                '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\\d]).{8,32}'
              ),
              message:
                'Minimum eight characters, at least one uppercase letter, one lowercase letter, one digit and one special character',
            },
          ]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          label="Confirm password"
          name="password_confirmation"
          :rules="[{ required: true, message: 'Please confirm password!' }]"
        >
          <a-input-password v-model:value="formState.password_confirmation">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
          <p class="p-1 m-0" style="color: red">
            {{ handleConfirmPassword }}
          </p>
        </a-form-item>

        <a-form-item
          label="Role"
          name="role"
          :rules="[{ required: true, message: 'Please select a role!' }]"
        >
          <a-select
            v-model:value="formState.role"
            show-search
            placeholder="Select a person"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="register-form-button"
            :loading="loading"
          >
            Create
          </a-button>

          <div class="login-link">
            <span>Or</span>
            <a-button type="default">
              <router-link to="/auth/login">Login</router-link>
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { TOKEN } from "../../constants/index";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import type { Ref } from "vue";
import { authServiceSuco } from "../../services/authServiceSuco";
import Cookies from "js-cookie";
import { useStore } from "vuex";
import type { SelectProps } from "ant-design-vue";
import { ROLE } from "../../constants/index";
import { USER_SIGN_UP } from "../../models/user";
import { STATUS_CODE, STATUS_TEXT } from "../../constants/index";

const store = useStore();
const loading: Ref<Boolean> = ref(false);
const router = useRouter();

const options = ref<SelectProps["options"]>([
  { value: ROLE.ADMIN, label: ROLE.ADMIN },
  { value: ROLE.USER, label: ROLE.USER },
]);

const formState = reactive<USER_SIGN_UP>({
  email: "",
  password: "",
  password_confirmation: "",
  firstname: "",
  lastname: "",
  role: "USER",
});

const onFinish = (values: any) => {
  const user: USER_SIGN_UP = {
    email: values.email,
    password: values.password,
    lastname: values.lastname,
    firstname: values.firstname,
    password_confirmation: values.password_confirmation,
    role: values.role,
  };
  loading.value = true;
  setTimeout(async () => {
    try {
      const result = await authServiceSuco.registerService(user);
      const data: string = result.data.status;
      const statusCode: number = result.status;
      if (statusCode === STATUS_CODE.SUCCESS) {
        toast.success("Success! Please verify your email before login!");
      }
    } catch (error) {
      const message: string = error.data.error.message;
      toast.error(message);
    }
    loading.value = false;
  }, 500);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const disabled = computed(() => {
  return !(
    formState.email &&
    formState.password &&
    formState.password_confirmation === formState.password &&
    formState.lastname &&
    formState.firstname &&
    formState.role
  );
});

const handleConfirmPassword = computed(() => {
  return formState.password !== formState.password_confirmation &&
    formState.password_confirmation
    ? "Password does not match!"
    : "";
});

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
<style scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 50px 0;
}

.form-container {
  max-width: 400px;
  width: 95%;
  margin: 0 auto;
}

.register-form {
  margin: 0 auto;
  overflow-y: auto;
}

.register-form .register-form-button {
  width: 100%;
}

.login-link {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
