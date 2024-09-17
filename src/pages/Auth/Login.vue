<template>
  <div class="form">
    <div class="form-container">
      <h4 class="text-center mb-4">Login</h4>
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
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

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
            :loading="loading"
          >
            Log in
          </a-button>

          <div class="register-link">
            <span>Or</span>
            <a-button type="default">
              <router-link to="/auth/register">Register now</router-link>
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import type { Ref } from "vue";
import { authService } from "../../services/authService";
import Cookies from "js-cookie";
import {
  LoadingOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import { TOKEN, ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/index";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { USER_SIGN_IN } from "../../models/user";
import { authServiceSuco } from "../../services/authServiceSuco";
import { STATUS_CODE } from "../../constants/index";

const loading: Ref<Boolean> = ref(false);
const router = useRouter();
const store = useStore();
const formState = reactive<USER_SIGN_IN>({
  email: "",
  password: "",
});

const onFinish = (values: any) => {
  const user: USER_SIGN_IN = {
    email: values.email,
    password: values.password,
  };
  loading.value = true;
  setTimeout(async () => {
    try {
      const result = await authServiceSuco.loginService(user);
      const data: string = result.data.status;
      const statusCode: number = result.status;
      const access_token: string = result.data.data.access_token;
      const refresh_token: string = result.data.data.refresh_token;
      if (result.status === STATUS_CODE.SUCCESS) {
        // Cookies
        Cookies.set(ACCESS_TOKEN, access_token);
        Cookies.set(REFRESH_TOKEN, refresh_token);
        // router
        router.push("/");
        // toast
        setTimeout(() => {
          toast.success("Login success!");
        }, 200);
      }
    } catch (error) {
      const message: string = error.data.error.message;
      toast.error(message);
    }
    loading.value = false;
  }, 1000);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const disabled = computed(() => {
  return !(formState.email && formState.password);
});
</script>
<style scoped>
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

.login-form {
  margin: 0 auto;
}

.login-form .login-form-button {
  width: 100%;
}

.register-link {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
