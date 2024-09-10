<template>
  <div class="form">
    <div class="form-container">
      <h4 class="text-center mb-4">Register</h4>
      <a-form
        :model="formState"
        class="register-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        :layout="formState.layout"
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
          label="Password"
          name="password"
          :rules="[
            { required: true, message: 'Please input your password!' },
            {
              min: 8,
              message: 'Min length is 8',
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
          name="confirmPassword"
          :rules="[{ required: true, message: 'Please confirm password!' }]"
        >
          <a-input-password v-model:value="formState.confirmPassword">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
          <p class="p-1 m-0" style="color: red;">
            {{ handleConfirmPassword }}
          </p>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="register-form-button"
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
import { reactive, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

interface FormState {
  layout: "horizontal" | "vertical" | "inline";
  email: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  email: "",
  password: "",
  confirmPassword: "",
  remember: true,
  layout: "vertical",
});

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const disabled = computed(() => {
  return !(formState.email && formState.password && formState.confirmPassword === formState.password);
});

const handleConfirmPassword = computed(() => {
  return formState.password !== formState.confirmPassword && formState.confirmPassword
    ? "Password does not match!"
    : "";
});
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.form-container {
  max-width: 400px;
  width: 95%;
  margin: 0 auto;
}

.register-form {
  margin: 0 auto;
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
