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
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username">
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
          <p class="p-1 m-0" style="color: red">
            {{ handleConfirmPassword }}
          </p>
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
import { authService } from "../../services/authService";
import Cookies from "js-cookie";
import { useStore } from "vuex";
interface FormState {
  layout: "horizontal" | "vertical" | "inline";
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const store = useStore();
const loading: Ref<Boolean> = ref(false);
const router = useRouter();

const formState = reactive<FormState>({
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  layout: "vertical",
});

const onFinish = (values: any) => {
  try {
    const user: {
      email: string;
      password: string;
      username: string;
    } = {
      email: values.email,
      password: values.password,
      username: values.username,
    };
    loading.value = true;
    setTimeout(async () => {
      const result = await authService.registerService(user);
      if (result.status === 200 && result.data.success) {
        const data = result.data.data;
        const token = data.token;
        const user = {
          id: data.id,
          roleId: data.roleId,
          email: data.email,
          avatar: data.avatar,
          username: data.username,
        };
        // store token to cookies
        Cookies.set(TOKEN, token);
        // dispatch user to reducer
        store.dispatch("user/setUserLoginAction", user);
        // push to homepage
        router.push("/");
        // toast
        setTimeout(() => {
          // toast
          toast.success(result.data.message);
        }, 100);
      } else {
        toast.error(result.data.message);
      }
      loading.value = false;
    }, 1000);
  } catch (error) {
    console.log("Login error");
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const disabled = computed(() => {
  return !(
    formState.email &&
    formState.password &&
    formState.confirmPassword === formState.password
  );
});

const handleConfirmPassword = computed(() => {
  return formState.password !== formState.confirmPassword &&
    formState.confirmPassword
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
